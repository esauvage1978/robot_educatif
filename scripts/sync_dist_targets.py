#!/usr/bin/env python3
"""Copie dist/ vers dist16 (dist-v16 est un lien symbolique vers dist16)."""
from __future__ import annotations

import shutil
import subprocess
import sys
from pathlib import Path

SRC = Path("/workspace/robot-educatif/dist")
TARGETS = [
    Path("/workspace/robot-educatif/dist16"),
]


def sync_tree(src: Path, dest: Path) -> None:
    dest.mkdir(parents=True, exist_ok=True)
    subprocess.run(
        ["rsync", "-a", "--delete", f"{src}/", f"{dest}/"],
        check=True,
    )


def main() -> int:
    if not SRC.is_dir():
        print(f"ERROR missing build output: {SRC}", file=sys.stderr)
        return 1
    for target in TARGETS:
        print(f"Sync {SRC} -> {target}")
        sync_tree(SRC, target)
    return 0


if __name__ == "__main__":
    sys.exit(main())
