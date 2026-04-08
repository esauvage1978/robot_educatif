#!/usr/bin/env bash
# Usage : depuis la racine du dépôt, avec Git Bash :
#   bash scripts/filter-remove-mblock-exe.sh
set -euo pipefail
export FILTER_BRANCH_SQUELCH_WARNING=1
cd "$(dirname "$0")/.."
git filter-branch -f \
	--index-filter 'git rm --cached --ignore-unmatch public/capture/installer-mblock-5-sous-windows-10/V5.6.0.exe' \
	--prune-empty \
	--tag-name-filter cat \
	-- --all
