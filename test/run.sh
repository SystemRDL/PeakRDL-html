#!/bin/bash

set -e

cd "$(dirname "$0")"

# Initialize venv
rm -rf .venv
python3 -m venv .venv
source .venv/bin/activate

# Install test dependencies
pip install -r requirements.txt

# Install dut
pip install -e "../[cli]"

# Run lint
pylint --rcfile pylint.rc ../src/peakrdl_html

# Run static type checking
mypy ../src/peakrdl_html
