#!/usr/bin/env python3

import sys
import os

import markdown

# Ignore this. Only needed for this example
this_dir = os.path.dirname(os.path.realpath(__file__))
sys.path.insert(0, os.path.join(this_dir, "../"))

from systemrdl import RDLCompiler, RDLCompileError
from ralbot.html import HTMLExporter

#===============================================================================
input_files = sys.argv[1:]

rdlc = RDLCompiler()

try:
    for input_file in input_files:
        rdlc.compile_file(input_file)
    root = rdlc.elaborate()
except RDLCompileError:
    sys.exit(1)

md = markdown.Markdown(
    extensions=['admonition']
)

html = HTMLExporter(markdown_inst=md)
html.export(
    root,
    os.path.join(this_dir, "../docs"),
    home_url="https://github.com/SystemRDL/RALBot-html"
)
