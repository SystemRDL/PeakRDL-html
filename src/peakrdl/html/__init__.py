import warnings

# Load modules
from peakrdl_html import __about__
from peakrdl_html import exporter
from peakrdl_html import search_indexer
from peakrdl_html import stringify

# hoist internal objects
from peakrdl_html.exporter import HTMLExporter


warnings.warn(
"""
================================================================================
Importing via namespace package 'peakrdl.html' is deprecated and will be
removed in the next release.
Change your imports to load the package using 'peakrdl_html' instead.
For more details, see: https://github.com/SystemRDL/PeakRDL/issues/4
================================================================================
""", DeprecationWarning, stacklevel=2)
