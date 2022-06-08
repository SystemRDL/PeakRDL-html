#!/bin/bash

set -e

this_dir="$( cd "$(dirname "$0")" ; pwd -P )"
cd $this_dir/../

# Run lint
pylint --rcfile $this_dir/pylint.rc src/peakrdl_html | tee $this_dir/lint.rpt

# Run static type checking
mypy src/peakrdl_html
