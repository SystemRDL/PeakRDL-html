[![PyPI - Python Version](https://img.shields.io/pypi/pyversions/ralbot-html.svg)](https://pypi.org/project/ralbot-html)

# RALBot-html
Generate address space documentation HTML from compiled SystemRDL input

## Installing
Install from [PyPi](https://pypi.org/project/ralbot-html) using pip:

    python3 -m pip install ralbot-html


## Example
An example of HTML output generated from Accelera's SystemRDL SATA AHCI reference.

[https://systemrdl.github.io/RALBot-html](https://systemrdl.github.io/RALBot-html)


## Usage
Pass the elaborated output of the [SystemRDL Compiler](http://systemrdl-compiler.readthedocs.io)
into the exporter.

Assuming `root` is the elaborated top-level node, or an internal `AddrmapNode`:

```python
from ralbot.html import HTMLExporter

exporter = HTMLExporter()

exporter.export(root, "path/to/output")
```


## Reference

### `HTMLExporter(markdown_inst=None, user_template_dir=None, user_context={})`
Constructor for the HTML exporter class

**Optional Parameters**

* `markdown_inst`
    * Override the class instance of the Markdown processor.
      See the [Markdown module](https://python-markdown.github.io/reference/#Markdown)
      for more details.
* `user_template_dir`
    * Path to a directory where user-defined template overrides are stored.
* `user_static_dir`
    * Path to user-defined static content to copy to output directory.
* `user_context`
    * Additional context variables to load into the template namespace.

### `HTMLExporter.export(node, output_dir, **kwargs)`
Perform the export!

**Parameters**

* `node`
    * Top-level node to export. Can be the top-level `RootNode` or any internal `AddrmapNode`.
* `output_dir`
    * HTML output directory.
    
**Optional Parameters**

* `footer`
    * Override footer text.
* `title`
    * Override title text.
* `home_url`
    * If a URL is specified, adds a home button to return to a parent home page.
