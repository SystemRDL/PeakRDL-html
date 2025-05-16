// This file is part of PeakRDL-html <https://github.com/SystemRDL/PeakRDL-html>.
// and can be redistributed under the terms of GNU GPL v3 <https://www.gnu.org/licenses/>.

// registry of register values by address string in hex
var RegValueRegistery = {};

function init_reg_value(){
    var state = get_reg_state();
    if(state != null) {
        var reg_el = document.getElementById("_RegValueTester");
        reg_el.value = "0x" + state.value.toString(16);
        reg_el.classList.remove("invalid");
        update_field_value_testers();
    } else {
        reset_field_inputs();
    }

    for(var i=0; i<RAL.get_node(CurrentID).fields.length; i++){
        update_field_enum_visibility(i);
    }
}

function save_reg_state(){
    var addr_key = RAL.get_absolute_addr(CurrentID).toString(16);
    var reg_el = document.getElementById("_RegValueTester");

    var state = {};
    state.value = BigInt(reg_el.value);
    state = userHooks.save_extra_reg_state(state)
    RegValueRegistery[addr_key] = state;
}

function get_reg_state(){
    var addr_key = RAL.get_absolute_addr(CurrentID).toString(16);
    if(addr_key in RegValueRegistery) {
        return RegValueRegistery[addr_key];
    } else {
        return null;
    }
}

function init_radix_buttons(){
    var node = RAL.get_node(CurrentID);
    for(var i=0; i<node.fields.length; i++){
        var el = document.getElementById("_RadixButton" + node.fields[i].name);
        el.innerHTML = node.fields[i].disp;
    }
}

function reset_field_inputs(){
    var node = RAL.get_node(CurrentID);
    for(var i=0; i<node.fields.length; i++){
        var el = document.getElementById("_FieldValueTester" + node.fields[i].name);
        el.value = format_field_value(i, node.fields[i].reset);
        if("encode" in node.fields[i]) {
            var el = document.getElementById("_FieldValueEnumTester" + node.fields[i].name);
            el.value = "0x" + node.fields[i].reset.toString(16);
        }
    }
    update_reg_value_tester();
}

function update_field_value_testers(){
    // Update all the field tester inputs based on the register input
    for(var i=0; i<RAL.get_node(CurrentID).fields.length; i++){
        update_field_value_tester(i);
    }
    userHooks.onRegValueEditorChange();
}

function update_reg_value_tester(){
    // Update the register tester input based on all of the individual field inputs
    var reg_value = 0n;
    var node = RAL.get_node(CurrentID);
    for(var i=0; i<node.fields.length; i++){
        var msb = BigInt(node.fields[i].msb);
        var lsb = BigInt(node.fields[i].lsb);
        var el = document.getElementById("_FieldValueTester" + node.fields[i].name);
        var value;
        try {
            value = parse_field_value(i, el.value);
        } catch(error) {
            if(error instanceof RangeError) {
                value = error.clamped;
            } else {
                throw error;
            }
        }
        var mask = (1n << (msb - lsb + 1n)) - 1n;
        value = value & mask;
        reg_value = reg_value + (value << lsb);
    }
    var reg_el = document.getElementById("_RegValueTester");
    reg_el.value = "0x" + reg_value.toString(16);
    reg_el.classList.remove("invalid");
    userHooks.onRegValueEditorChange();
}

function update_field_value_tester(idx){
    var reg_el = document.getElementById("_RegValueTester");
    var reg_value = BigInt(reg_el.value);
    var node = RAL.get_node(CurrentID);

    var msb = BigInt(node.fields[idx].msb);
    var lsb = BigInt(node.fields[idx].lsb);
    var value = reg_value >> lsb;
    var mask = (1n << (msb - lsb + 1n)) - 1n;
    value = value & mask;
    var el = document.getElementById("_FieldValueTester" + node.fields[idx].name);
    el.value = format_field_value(idx, value);
    el.classList.remove("invalid");

    if("encode" in RAL.get_node(CurrentID).fields[idx]) {
        var el = document.getElementById("_FieldValueEnumTester" + node.fields[idx].name);
        el.value = "0x" + value.toString(16);
    }
}

// Helper: Convert raw unsigned value to signed integer
function toSigned(value, width) {
    var sign_bit = 1n << (BigInt(width) - 1n);
    if((value & sign_bit) !== 0n) {
        value = value - (1n << BigInt(width));
    }
    return value;
}

// Helper: Convert signed integer to its raw unsigned representation
function fromSigned(value, width) {
    var sign_bit = 1n << (BigInt(width) - 1n);
    if((value & sign_bit) !== 0n) {
        value = value + (1n << BigInt(width));
    }
    return value;
}

// Helper: Convert fixed-point field value to a real number
function fromFixedPoint(value, width, fracw, is_signed) {
    if(is_signed) {
        value = toSigned(value, width);
    }
    return Number(value) * Math.pow(2, -fracw);
}

function format_field_value(idx, value) {
    var field = RAL.get_node(CurrentID).fields[idx];
    var width = BigInt(field.msb) - BigInt(field.lsb) + 1n;
    if(field.disp == "R") {
        var num = fromFixedPoint(value, width, field.fracwidth, field.is_signed);
        // Always print a decimal point for real numbers
        return num % 1 === 0 ? num.toFixed(1) : num.toString();
    } else if(field.disp == "D") {
        if(field.is_signed) {
            return toSigned(value, width).toString();
        } else {
            return value.toString();
        }
    } else {
        return("0x" + value.toString(16));
    }
}

// parse a formatted (input) value into the raw field value
// if out of bounds, throw a RangeError with a "clamped"
//   property containg the closest valid field value
function parse_field_value(idx, str) {
    var node = RAL.get_node(CurrentID);
    var disp = node.fields[idx].disp;
    var width = BigInt(node.fields[idx].msb) - BigInt(node.fields[idx].lsb) + 1n;
    var is_signed = node.fields[idx].is_signed;

    var value;
    if(disp === "R") {
        // Fixed-point: parse as real, convert to (signed) integer
        var fracw = node.fields[idx].fracwidth;
        var realval = Number(str);
        if(isNaN(realval)) throw new SyntaxError("Invalid real number");
        value = BigInt(Math.round(realval * Math.pow(2, fracw)));
    } else {
        // Parse as integer
        value = BigInt(str);
    }

    // range checks
    if(is_signed && (disp === "R" || disp === "D")) {
        // check signed integer
        var min = -(1n << (width - 1n));
        var max = (1n << (width - 1n)) - 1n;

        if(value < min || value > max) {
            const err = new RangeError("Input out of bounds");
            clamped = value < min ? min : (value > max ? max : value);
            err.clamped = fromSigned(clamped, width);
            throw err;
        }

        return fromSigned(value, width);
    } else {
        // check unsigned integer
        var min = 0n;
        var max = (1n << width) - 1n;

        if(value < min || value > max) {
            const err = new RangeError("Input out of bounds");
            err.clamped = value < min ? min : (value > max ? max : value);
            throw err;
        }

        return value;
    }
}

function update_field_enum_visibility(idx){
    var node = RAL.get_node(CurrentID);

    if(!("encode" in node.fields[idx])) return;

    var d = node.fields[idx].disp;
    var enum_el = document.getElementById("_FieldValueEnumTester" + node.fields[idx].name);
    var txt_el = document.getElementById("_FieldValueTester" + node.fields[idx].name);
    if(d == "E") {
        enum_el.style.display = "inline";
        txt_el.style.display = "none";
    } else {
        enum_el.style.display = "none";
        txt_el.style.display = "inline";
    }
}

//==============================================================================
// Events
//==============================================================================

function onRadixSwitch(el){
    var idx = RAL.lookup_field_idx(el.dataset.name);
    var node = RAL.get_node(CurrentID);
    var d = node.fields[idx].disp;
    var field = node.fields[idx];
    if(d == "H") {
        d = "D";
    } else if(d == "D" && ("encode" in field)) {
        d = "E";
    } else if((d == "D" || d == "E") && ("fracwidth" in field)) {
        d = "R";
    } else {
        d = "H";
    }

    el.innerHTML = d;
    node.fields[idx].disp = d;
    update_field_enum_visibility(idx);
    update_field_value_tester(idx);
}

function onDecodedFieldEnumChange(el) {
    var idx = RAL.lookup_field_idx(el.dataset.name);
    var el2 = document.getElementById("_FieldValueTester" + RAL.get_node(CurrentID).fields[idx].name);
    el2.value = el.value;
    update_reg_value_tester();
    save_reg_state();
}

function onDecodedFieldInput(el){
    var idx = RAL.lookup_field_idx(el.dataset.name);
    var node = RAL.get_node(CurrentID);
    var value;

    el.classList.remove("invalid");
    try {
        value = parse_field_value(idx, el.value);
    } catch(error) {
        if(!el.classList.contains("invalid")) el.classList.add("invalid");
        if(error instanceof RangeError) {
            value = error.clamped;
        } else {
            return;
        }
    }

    if("encode" in node.fields[idx]) {
        var el2 = document.getElementById("_FieldValueEnumTester" + node.fields[idx].name);
        el2.value = "0x" + value.toString(16);
    }
    update_reg_value_tester();
    save_reg_state();
}

function onEncodedRegInput(el){
    var value;
    try {
        value = BigInt(el.value);
    } catch(error) {
        value = -1n;
    }

    if(value < 0){
        if(!el.classList.contains("invalid")) el.classList.add("invalid");
        return;
    }
    el.classList.remove("invalid");
    update_field_value_testers();
    save_reg_state();
}

function onResetRegValue(el){
    reset_field_inputs();
    save_reg_state();
}
