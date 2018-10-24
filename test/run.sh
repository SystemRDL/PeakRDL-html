#!/bin/bash

set -e

this_dir="$( cd "$(dirname "$0")" ; pwd -P )"
cd $this_dir/../

# Run lint
cd ralbot
pylint --rcfile $this_dir/pylint.rc html | tee $this_dir/lint.rpt
