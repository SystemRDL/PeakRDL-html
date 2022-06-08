[![build](https://github.com/SystemRDL/PeakRDL-html/workflows/build/badge.svg)](https://github.com/SystemRDL/PeakRDL-html/actions?query=workflow%3Abuild+branch%3Amaster)
[![PyPI - Python Version](https://img.shields.io/pypi/pyversions/peakrdl-html.svg)](https://pypi.org/project/peakrdl-html)

# PeakRDL-html
Generate address space documentation HTML from compiled SystemRDL input.

## Installing
Install from [PyPi](https://pypi.org/project/peakrdl-html) using pip:

    python3 -m pip install peakrdl-html


## Example

An [example of HTML output](https://systemrdl.github.io/PeakRDL-html) generated from a
fictional SystemRDL register description: [turboencabulator.rdl](example/turboencabulator.rdl).


## Usage
Pass the elaborated output of the [SystemRDL Compiler](http://systemrdl-compiler.readthedocs.io)
into the exporter.

Assuming `root` is the elaborated top-level node, or an internal `AddrmapNode`:

```python
from peakrdl_html import HTMLExporter

exporter = HTMLExporter()

exporter.export(root, "path/to/output")
```


## Reference

### `HTMLExporter(**kwargs)`
Constructor for the HTML exporter class

**Optional Parameters**

* `markdown_inst`
    * Override the class instance of the Markdown processor.
      See the [Markdown module](https://python-markdown.github.io/reference/#Markdown)
      for more details.
    * By default, the following extensions are loaded: 'extra', 'admonition', 'mdx_math'
* `user_template_dir`
    * Path to a directory where user-defined template overrides are stored.
* `user_static_dir`
    * Path to user-defined static content to copy to output directory.
* `user_context`
    * Additional context variables to load into the template namespace.
* `show_signals`
    * Show signal components. Default is False
* `extra_doc_properties`
    * List of properties to explicitly document.

      Nodes that have a property explicitly set will show its value in a table
      in the node's description. Use this to bring forward user-defined
      properties, or other built-in properties in your documentation.
* `generate_source_links`
    * If `True`, attempts to generate links back to original RDL source deginitions.
      Defaults to `True`.
* `gitmetheurl_translators`
    * Override the list of [GitMeTheURL](https://github.com/amykyta3/git-me-the-url/blob/master/README.md) translators to use when generating source links.
      If unset, GitMeTheURL uses its builtin translators, as well as any installed plugins.


### `HTMLExporter.export(node, output_dir, **kwargs)`
Perform the export!

**Parameters**

* `nodes`
    * Top-level node to export. Can be the top-level `RootNode` or any internal `AddrmapNode`.
      Can also be a list of `RootNode` and any internal `AddrmapNode`.
* `output_dir`
    * HTML output directory.

**Optional Parameters**

* `footer`
    * Override footer text.
* `title`
    * Override title text.
* `home_url`
    * If a URL is specified, adds a home button to return to a parent home page.
* `skip_not_present`
    * Control whether nodes with `ispresent=false` are generated. Default is True.
