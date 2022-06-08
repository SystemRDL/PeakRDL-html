import os
import setuptools

with open("README.md", "r", encoding='utf-8') as fh:
    long_description = fh.read()


with open(os.path.join("src/peakrdl_html", "__about__.py"), encoding='utf-8') as f:
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
    package_dir={'': 'src'},
    packages=[
        'peakrdl_html',
        'peakrdl.html', # backwards compatibility shim
    ],
    include_package_data=True,
    install_requires=[
        "systemrdl-compiler>=1.13.0",
        "Jinja2>=2.9",
        "markdown",
        "git-me-the-url>=2.0.1",
        "python-markdown-math",
    ],
    classifiers=(
        "Development Status :: 5 - Production/Stable",
        "Programming Language :: Python",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.5",
        "Programming Language :: Python :: 3.6",
        "Programming Language :: Python :: 3.7",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
        "Programming Language :: Python :: 3.10",
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
