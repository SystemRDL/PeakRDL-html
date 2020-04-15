import os
import setuptools

with open("README.md", "r") as fh:
    long_description = fh.read()


with open(os.path.join("peakrdl/html", "__about__.py")) as f:
    v_dict = {}
    exec(f.read(), v_dict)
    version = v_dict['__version__']

setuptools.setup(
    name="peakrdl-html",
    version=version,
    author="Alex Mykyta",
    author_email="amykyta3@github.com",
    description="HTML documentation generator for SystemRDL-based register models",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/SystemRDL/PeakRDL-html",
    packages=['peakrdl.html'],
    include_package_data=True,
    install_requires=[
        "systemrdl-compiler>=1.8.0",
        "Jinja2>=2.9",
        "markdown",
    ],
    classifiers=(
        "Development Status :: 5 - Production/Stable",
        "Programming Language :: Python",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.5",
        "Programming Language :: Python :: 3.6",
        "Programming Language :: Python :: 3.7",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3 :: Only",
        "Intended Audience :: Developers",
        "License :: OSI Approved :: GNU General Public License v3 (GPLv3)",
        "Operating System :: OS Independent",
        "Topic :: Scientific/Engineering :: Electronic Design Automation (EDA)",
        "Topic :: Software Development :: Documentation",
    ),
    project_urls={
        "Source": "https://github.com/SystemRDL/PeakRDL-html",
        "Tracker": "https://github.com/SystemRDL/PeakRDL-html/issues",
    },
)
