from typing import TYPE_CHECKING

from .exporter import HTMLExporter

if TYPE_CHECKING:
    import argparse
    from systemrdl.node import AddrmapNode


class Exporter:
    short_desc = "Generate HTML documentation"
    long_desc = "Generate dynamic HTML documentation pages"


    def add_exporter_arguments(self, arg_group: 'argparse.ArgumentParser') -> None:
        arg_group.add_argument(
            "--title",
            dest="title",
            default=None,
            help="Override title text"
        )

        arg_group.add_argument(
            "--home-url",
            dest="home_url",
            metavar="URL",
            default=None,
            help="If a URL is specified, adds a home button to return to a parent home page"
        )

        arg_group.add_argument(
            "--show-signals",
            dest="show_signals",
            default=False,
            action="store_true",
            help="Show signal components in generated doc pages"
        )


    def do_export(self, top_node: 'AddrmapNode', options: 'argparse.Namespace') -> None:
        html = HTMLExporter(
            show_signals=options.show_signals,
        )
        html.export(
            top_node,
            options.output,
            title=options.title,
            home_url=options.home_url,
        )
