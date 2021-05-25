#!/bin/bash

set -e

this_dir="$( cd "$(dirname "$0")" ; pwd -P )"
cd $this_dir/../

# Run lint
cd peakrdl
pylint --rcfile $this_dir/pylint.rc html | tee $this_dir/lint.rpt

# Run static type checking
cd $this_dir
mypy $this_dir/../peakrdl/html
