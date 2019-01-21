var RALIndex = [
  {
    "parent": null,
    "children": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11
    ],
    "name": "den_sata_ahci_map",
    "offset": "0x0",
    "size": "0x320"
  },
  {
    "parent": 0,
    "children": [],
    "name": "HBA_CAP",
    "offset": "0x0",
    "size": "0x4",
    "fields": [
      "NP",
      "SXS",
      "EMS",
      "CCCS",
      "NCS",
      "PSC",
      "SSC",
      "PMD",
      "FBSS",
      "SPM",
      "SAM",
      "SNZO",
      "ISS",
      "SCLO",
      "SAL",
      "SALP",
      "SSS",
      "SMPS",
      "SSNTF",
      "SNCQ",
      "S64A"
    ]
  },
  {
    "parent": 0,
    "children": [],
    "name": "GHC",
    "offset": "0x4",
    "size": "0x4",
    "fields": [
      "HR",
      "IE",
      "MRSM",
      "AE"
    ]
  },
  {
    "parent": 0,
    "children": [],
    "name": "IS",
    "offset": "0x8",
    "size": "0x4",
    "fields": [
      "IPS"
    ]
  },
  {
    "parent": 0,
    "children": [],
    "name": "PI",
    "offset": "0xc",
    "size": "0x4",
    "fields": [
      "PI"
    ]
  },
  {
    "parent": 0,
    "children": [],
    "name": "VS",
    "offset": "0x10",
    "size": "0x4",
    "fields": [
      "MNR",
      "MJR"
    ]
  },
  {
    "parent": 0,
    "children": [],
    "name": "CCC_CTL",
    "offset": "0x14",
    "size": "0x4",
    "fields": [
      "EN",
      "INT",
      "CC",
      "TV"
    ]
  },
  {
    "parent": 0,
    "children": [],
    "name": "CCC_PORTS",
    "offset": "0x18",
    "size": "0x4",
    "fields": [
      "PRT"
    ]
  },
  {
    "parent": 0,
    "children": [],
    "name": "EM_LOC",
    "offset": "0x1c",
    "size": "0x4",
    "fields": [
      "SZ",
      "OFST"
    ]
  },
  {
    "parent": 0,
    "children": [],
    "name": "EM_CTL",
    "offset": "0x20",
    "size": "0x4",
    "fields": [
      "ATTR_SMB"
    ]
  },
  {
    "parent": 0,
    "children": [],
    "name": "foo",
    "offset": "0xa0",
    "size": "0x4",
    "fields": [
      "bar"
    ]
  },
  {
    "parent": 0,
    "children": [
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19
    ],
    "name": "PORT",
    "offset": "0x100",
    "size": "0x20",
    "dims": [
      5
    ],
    "stride": "0x80",
    "idxs": [
      0
    ]
  },
  {
    "parent": 11,
    "children": [],
    "name": "CLB",
    "offset": "0x0",
    "size": "0x4",
    "fields": [
      "CLB"
    ]
  },
  {
    "parent": 11,
    "children": [],
    "name": "CLBU",
    "offset": "0x4",
    "size": "0x4",
    "fields": [
      "CLBU"
    ]
  },
  {
    "parent": 11,
    "children": [],
    "name": "FB",
    "offset": "0x8",
    "size": "0x4",
    "fields": [
      "FB"
    ]
  },
  {
    "parent": 11,
    "children": [],
    "name": "FBU",
    "offset": "0xc",
    "size": "0x4",
    "fields": [
      "FBU"
    ]
  },
  {
    "parent": 11,
    "children": [],
    "name": "IS",
    "offset": "0x10",
    "size": "0x4",
    "fields": [
      "DHRS",
      "PSS",
      "DSS",
      "SBDS",
      "UFS",
      "DPS",
      "PCS",
      "DMPS",
      "PRCS",
      "IPMS",
      "OFS",
      "IONFS",
      "IFS",
      "HBDS",
      "HBFS",
      "TFES",
      "CPDS"
    ]
  },
  {
    "parent": 11,
    "children": [],
    "name": "IE",
    "offset": "0x14",
    "size": "0x4",
    "fields": [
      "DHRE",
      "PSE",
      "DSE",
      "SBDE",
      "UFS",
      "DPE",
      "PCE",
      "DMPE",
      "PRCE",
      "IPME",
      "OFE",
      "IONFE",
      "IFE",
      "HBDE",
      "HBFE",
      "TFEE",
      "CPDE"
    ]
  },
  {
    "parent": 11,
    "children": [],
    "name": "ICC",
    "offset": "0x18",
    "size": "0x4",
    "fields": [
      "ST",
      "SUD",
      "POD",
      "CLO",
      "FRE",
      "CCS",
      "MPSS",
      "FR",
      "CR",
      "CPS",
      "PMA",
      "HPCP",
      "MPSP",
      "CPD",
      "ESP",
      "ATAPI",
      "DLAE",
      "ALPE",
      "ASP",
      "ICC"
    ]
  },
  {
    "parent": 11,
    "children": [],
    "name": "TFD",
    "offset": "0x1c",
    "size": "0x4",
    "fields": [
      "ERR",
      "STS"
    ]
  }
];