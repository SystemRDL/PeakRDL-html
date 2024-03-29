#!/usr/bin/env python3

import sys
import os

# Ignore this. Only needed for this example
this_dir = os.path.dirname(os.path.realpath(__file__))
sys.path.insert(0, os.path.join(this_dir, "../src/"))

from systemrdl import RDLCompiler, RDLCompileError
from peakrdl_html import HTMLExporter

#===============================================================================
input_files = sys.argv[1:]

rdlc = RDLCompiler()

try:
    for input_file in input_files:
        rdlc.compile_file(input_file)
    root = rdlc.elaborate()
except RDLCompileError:
    sys.exit(1)

html = HTMLExporter()
html.export(
    root,
    os.path.join(this_dir, "../docs"),
    home_url="https://github.com/SystemRDL/PeakRDL-html"
)
