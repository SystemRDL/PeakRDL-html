// This file is part of PeakRDL-html <https://github.com/SystemRDL/PeakRDL-html>.
// and can be redistributed under the terms of GNU GPL v3 <https://www.gnu.org/licenses/>.

var CurrentID;

//==============================================================================
// User-overridable hooks
//==============================================================================
var userHooks = {
    // Triggered when page is loaded the first time
    onPageLoad: function() {
    },

    // Triggered when main pane is loaded with new content and page finished
    // updating
    onContentLoad: function() {
    },

    // Triggered when page's absolute address was updated due to an index-edit
    // value change
    onAddressUpdate: function() {
    },

    // Triggered when any of the register's encoded or decoded value form fields
    // were changed
    onRegValueEditorChange: function() {
    },

    // When saving register state, provide additional data to the state object
    save_extra_reg_state: function(state) {
        return state;
    },

    // Global keystroke event
    onKeyDown: function(ev) {
        // return True if event was not handled here
        return true;
    }
};

//==============================================================================
// Page actions
//==============================================================================

function onPageLoad() {
    if(test_browser_incompatible()) {
        show_incompatibility_nag();
        return;
    }

    window.onpopstate = onPopState;
    window.onkeydown = onKeyDownMain;

    // Determine what page id will be loaded
    var url = new URL(window.location.href);
    var path = url.searchParams.get("p", path);
    var parsed_path = parse_path(path);
    var id;
    if(parsed_path == null) {
        id = 0;
    } else {
        id = parsed_path[0];
    }

    // Prepare content for initial page load
    ral_expand_all_bigint_pass1(id);
    var deferred_sb_work;
    deferred_sb_work = init_tree_pass1(id);
    init_sb_resizer();

    // Load content
    load_page_via_url().then(() => {
        // finish remaining initialization after page load
        // defer it to the next animation frame
        // TODO: Figure out a better way to defer these to after page rendering
        // requestAnimationFrame and other methods don't seem to work
        setTimeout(() => {
            ral_expand_all_bigint_pass2();
            init_tree_pass2(deferred_sb_work);
        }, 100);
    });

    init_index_edit();
    userHooks.onPageLoad();
}

function onKeyDownMain(ev) {
    if(!ev) ev = window.event;
    var unhandled;

    if(ev.ctrlKey && ev.key == "\\"){
        // Navigate to parent node
        load_parent_page();
        return false;
    }

    unhandled = onKeyDownSearch(ev);
    if(!unhandled) return false;

    unhandled = onKeyDownIdxEdit(ev);
    if(!unhandled) return false;

    unhandled = userHooks.onKeyDown(ev);
    if(!unhandled) return false;
}

function platform_is_windows() {
    try {
        if(navigator.userAgentData.platform == "Windows") {
            return true;
        }
    } catch(error) {
        // fall-back to legacy api
        if((navigator.platform == "Win32") || (navigator.platform == "Win64")) {
            return true;
        }
    }
    return false
}

function show_file_protocol_nag() {
    var this_dir = window.location.pathname.replace(/[\\/]index.html/g, "")
    if(platform_is_windows()) {
        // remove leading slash that shows up ahead of path: "/C:/Users/..."
        this_dir = this_dir.replace(/^\/(\w:)/g, "$1");
    }
    var html_str;

    html_str =
          "<h1>Oops!</h1>"
        + "<p>Most modern <a href='https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors/CORSRequestNotHttp' target='_blank'>browser's security policies</a> "
        + "prevent this page from loading properly when using the <code>file://</code> protocol.</p>"
        + "<p>If possible, host this page on a web server and access using the <code>http://</code> protocol.</p>"

        + "<h2>Alternatives</h2>"
        ;

    if(platform_is_windows()) {
        html_str +=
              "<h3>Use one of the included launcher scripts</h3>"
            + "<p>"
            + "In the folder that contains these docs, double-click the launcher for the browser of your choice:"
            + "<ul>"
            + "    <li><code>launcher-windows-chrome.bat</code></li>"
            + "    <li><code>launcher-windows-edge.bat</code></li>"
            + "    <li><code>launcher-windows-firefox.bat</code></li>"
            + "</ul>"
            + "These launcher scripts will temporarily disable the security setting so you can view this page locally."
            + "</p>"
            ;
    }

    if(platform_is_windows()) {
        html_str +=
            "<h3>Python http server</h3>"
            + "<p>"
            + "Launch a temporary http server using Python:"
            + "<ol>"
            + "    <li>If you haven't already, <a href='https://www.python.org/downloads/' target='_blank'>download and install Python</a></li>"
            + "    <li>"
            + "    Press <span class='kb-shortcut-key'>WIN</span>+<span class='kb-shortcut-key'>R</span> and paste the following into the text box:"
            + "    <p><input type='text' readonly=true style='width:100%;' value='py.exe -m http.server -d \"" + this_dir + "\"'></p>"
            + "    </li>"
            + "    <li>Click 'Ok'</li>"
            + "    <li>Re-open this page via: <a href='http://localhost:8000/'>http://localhost:8000/</a></li>"
            + "</ol>"
            + "</p>"
            ;
    } else {
        html_str +=
            "<h3>Python http server</h3>"
            + "<p>"
            + "Launch a temporary http server using Python:"
            + "<pre>"
            + 'python3 -m http.server -d "' + this_dir + '"'
            + "</pre>"
            + "Then view via: <a href='http://localhost:8000/' target='_blank'>http://localhost:8000/</a>"
            + "</p>"
            ;
    }

    html_str +=
          "<h3>Firefox</h3>"
        + "<p>"
        + "Change your Firefox security settings:"
        + "<ol>"
        + "    <li>In your address bar, type <code>about:config</code></li>"
        + "    <li>Set <code>security.fileuri.strict_origin_policy</code> to <code>false</code></li>"
        + "    <li>Refresh this page</li>"
        + "</ol>"
        + "</p>"
        ;

    if(platform_is_windows()) {
        html_str +=
              "<h3>Chrome or Edge</h3>"
            + "<p>"
            + "<ol>"
            + "    <li>Close your current Chrome or Edge browser session completely</li>"
            + "    <li>"
            + "    Press <span class='kb-shortcut-key'>WIN</span>+<span class='kb-shortcut-key'>R</span> and paste the following into the text box:"
            + "    <p><input type='text' readonly=true style='width:100%;' value='chrome.exe --allow-file-access-from-files \"" + window.location.href + "\"'></p>"
            + "    For Microsoft Edge, replace 'chrome.exe' with 'msedge.exe'"
            + "    </li>"
            + "    <li>Click 'Ok'</li>"
            + "</ol>"
            + "</p>"
            ;
    } else {
        html_str +=
              "<h3>Chrome</h3>"
            + "<p>"
            + "Close your current Chrome session and re-launch it from the command-line using:"
            + "<pre>"
            + "google-chrome --allow-file-access-from-files \\\n"
            + '    "' + window.location.href + '"'
            + "</pre>"
            + "</p>"
            ;
    }

    var el = document.getElementById("_ContentContainer");
    el.innerHTML = html_str;
}

function show_incompatibility_nag() {
    var el = document.getElementById("_ContentContainer");
    el.innerHTML
    = "<h1>Nope!</h1>"
    + "<p>It looks like the browser you are using is not supported.</p>"
    + "<p>Please use a modern browser such as "
    + "<a href='https://www.mozilla.org/en-US/firefox' target='_blank'>Firefox</a>"
    + " or <a href='https://www.google.com/chrome/' target='_blank'>Chrome</a>.</p>"
    ;
}

function test_browser_incompatible() {
    // Test for browser features that absolutely have to exist
    try {
        var url = new URL(window.location.href);
    } catch(error) {
        return true;
    }
    return false;
}

function update_crumbtrail(){
    var crumb_el = document.getElementById("_Crumbtrail");
    var id = CurrentID;

    // Delete old crumbtrail
    while (crumb_el.hasChildNodes()) {
        crumb_el.removeChild(crumb_el.lastChild);
    }

    var path_ids = get_ids_in_path(id);
    var crumb_idx_span_idx = 0;

    for(var i=0; i<path_ids.length; i++){
        if(i < path_ids.length-1){
            var link = document.createElement("a");
            link.dataset.id = path_ids[i];
            link.href = "?p=" + get_path(path_ids[i]);
            link.innerHTML = RALIndex[path_ids[i]].name;
            link.onclick = onClickNodeLink;
            crumb_el.appendChild(link);
        } else {
            var el = document.createElement("span");
            el.innerHTML = RALIndex[path_ids[i]].name;
            crumb_el.appendChild(el);
        }

        if("dims" in RALIndex[path_ids[i]]){
            for(var dim=0; dim<RALIndex[path_ids[i]].dims.length; dim++){
                var el = document.createElement("span");
                el.dataset.id = path_ids[i];
                el.dataset.dim = dim;
                el.dataset.span_idx = crumb_idx_span_idx;
                el.className = "crumb-idx";
                el.id = "_CrumbIdxSpan" + crumb_idx_span_idx;
                el.onclick = onClickCrumbtrailIdx;
                el.innerHTML = "[" + RALIndex[path_ids[i]].idxs[dim] + "]";
                crumb_el.appendChild(el);
                crumb_idx_span_idx++;
            }
        }

        if(i < path_ids.length-1){
            var el = document.createElement("span");
            el.className = "crumb-separator";
            el.innerHTML = ".";
            crumb_el.appendChild(el);
        }
    }
}

function update_absolute_addr(addr){
    document.getElementById("_AbsAddr").innerHTML = "0x" + addr.toString(16);
}

function update_rdlfc_indexes() {
    var index_els = document.getElementsByClassName("rdlfc-index")
    var index_text = "";
    if("dims" in RALIndex[CurrentID]){
        for(var i=0; i<RALIndex[CurrentID].idxs.length; i++){
            index_text += "[" + RALIndex[CurrentID].idxs[i] + "]";
        }
    }
    for(var i=0; i<index_els.length; i++){
        index_els[i].innerHTML = index_text;
    }

    var index_els = document.getElementsByClassName("rdlfc-index_parent")
    var index_text = "";
    var id = RALIndex[CurrentID].parent;
    if(id != null){
        if("dims" in RALIndex[id]){
            for(var i=0; i<RALIndex[id].idxs.length; i++){
                index_text += "[" + RALIndex[id].idxs[i] + "]";
            }
        }
    }
    for(var i=0; i<index_els.length; i++){
        index_els[i].innerHTML = index_text;
    }
}

function help_modal_open() {
    document.getElementById("_HelpOverlay").style.display = "flex";
}

function help_modal_close () {
    document.getElementById("_HelpOverlay").style.display = "none";
}

//==============================================================================
// Misc
//==============================================================================

function isDescendant(parent, child) {
    var node = child.parentNode;
    while (node != null) {
        if (node == parent) {
            return(true);
        }
        node = node.parentNode;
    }
    return(false);
}

async function take_a_break(){
    await new Promise(r => setTimeout(r, 1));
}

function difference(setA, setB) {
    const _difference = new Set(setA);
    for (const elem of setB) {
        _difference.delete(elem);
    }
    return _difference;
}

//==============================================================================
// Compatibility Workarounds
//==============================================================================
// IE does not support Number.isInteger
function isPositiveInteger(num) {
    return ((num ^ 0) >>> 0) === num;
}

// IE does not support <string>.startsWith
if(!String.prototype.startsWith) {
    String.prototype.startsWith = function(searchString, position) {
        position = position || 0;
        return this.indexOf(searchString, position) === position;
    };
}
