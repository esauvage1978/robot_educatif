#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
git for-each-ref --format="%(refname)" refs/original/ | while read -r ref; do
	[ -n "$ref" ] && git update-ref -d "$ref"
done
git reflog expire --expire=now --all
git gc --prune=now --aggressive
