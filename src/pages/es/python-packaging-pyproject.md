---
layout: ../../layouts/EsPost.astro
title: "pyproject.toml: empaquetado moderno en Python"
description: "pyproject.toml (PEP 621): venv, python -m build, wheel, console_scripts y mini-proyecto salutcli. 20 ejercicios, octubre 2026."
updated: "31 de octubre de 2026"
schemaUpdated: "2026-10-31"
faqSchema:
  - question: "¿Para qué sirve pyproject.toml?"
    answer: "Archivo de configuración moderno de un proyecto Python: metadatos, dependencias, scripts CLI y build backend según PEP 621."
  - question: "¿Cómo instalo un proyecto en modo editable?"
    answer: "En la raíz del proyecto, con venv activo: pip install -e . Los cambios en el código se ven sin reinstalar."
  - question: "¿Qué comando genera wheel y sdist?"
    answer: "Tras pip install build, ejecuta python -m build en la raíz. Los archivos aparecen en dist/ (.whl y .tar.gz)."
---

**Respuesta directa (octubre de 2026):** para hacer un proyecto **instalable** con **`pip`** (instalador de paquetes Python), descríbelo en **`pyproject.toml`** según **PEP 621** — **PEP** significa *Python Enhancement Proposal* (propuesta oficial de mejora del lenguaje). Construye un **wheel** (`.whl`) con **`python -m build`** y prueba con **`pip install -e .`**. Lección del [recorrido Python avanzado](/programmation/python-avance/) tras el [tipado avanzado](/python-av-typing-avance/) y enlazada al [capítulo packaging (6/6) del journal CLI](/projet-av-journal-6-package-pyproject/).

Empaquetar una biblioteca o una **aplicación de línea de comandos** usa la **CLI** (*Command Line Interface* — comandos en la **terminal**). Hacen falta metadatos, layout **`src/`**, **`console_scripts`** (comando tras instalar, p. ej. `salutcli`) y **wheels**. Un **build backend** (herramienta que lee `pyproject.toml` y construye el paquete) se declara en **`[build-system]`** — **`setuptools`**, **`hatchling`**, **`flit`**, **`poetry`**; aquí **setuptools**.

**100 % empaquetado Python** — no hace falta robot. Editor y [venv con pip](/python-inter-venv-pip/) (entorno virtual aislado) bastan.

![Terminal Python con comando pip](/images/lot2/python-plus-ou-moins-terminal.webp)

*Captura (Emmanuel Sauvage, Robot Éducatif — octubre 2026): comprueba Python y `pip` en la terminal, preferiblemente con venv activo.*

| Info | Detalle |
| --- | --- |
| **Objetivo** | `pyproject.toml` válido, wheel, comando CLI operativo |
| **Nivel** | Intermedio → difícil (ejercicios 15–20) |
| **Tiempo** | 45–90 minutos |
| **Prerrequisitos** | [venv y pip](/python-inter-venv-pip/), bases de Python, [pathlib](/es/python-pathlib/) útil |
| **Resultado** | Carpeta `dist/` con `.whl` + comando `salutcli` |

<aside class="article-callout" role="note">
<p><strong>Antes de empezar</strong></p>
<ul>
<li><strong>Python 3.10+</strong> (<code>python --version</code>).</li>
<li><code>python -m venv .venv</code> y activación.</li>
<li><code>python -m pip install -U pip build</code>.</li>
<li>Para **PyPI** (índice público de paquetes): **2FA** activa; nunca tokens API en el repositorio; <code>twine</code> solo al publicar.</li>
</ul>
</aside>

## 1. `pyproject.toml` mínimo

Tres bloques para empezar:

```toml
[build-system]
requires = ["setuptools>=61"]
build-backend = "setuptools.build_meta"

[project]
name = "miherramienta"
version = "0.1.0"
dependencies = ["requests>=2.28"]

[project.scripts]
miherramienta = "miherramienta.cli:main"
```

- **`[build-system]`** — herramienta que construye el wheel (aquí **setuptools**).
- **`[project]`** — nombre, versión, dependencias (visibles en **PyPI** si publicas).
- **`[project.scripts]`** — registra un comando; **`miherramienta.cli:main`** apunta a **`main`** en **`cli.py`**.

## 2. Instalación editable

**`pip install -e .`** = modo **desarrollo** (**`-e`** = editable): cambios visibles **sin** reinstalar. El **`.`** es la carpeta con **`pyproject.toml`**.

**Comprobación:** **`pip show miherramienta`** muestra versión y ruta.

## 3. Wheel y sdist

**`python -m build`** crea dos archivos en **`dist/`**:

- **wheel** (`.whl`) — archivo preconstruido, instalación rápida.
- **sdist** (`.tar.gz`) — fuente, reconstruido en la máquina del usuario (más lento).

Para aprender bastan **wheel local** y **`pip install -e .`** — no hace falta cuenta **PyPI**.

<figure>
<img src="/images/illustrations/projet-av-journal-6-package-pyproject.webp" alt="Ilustración didáctica: proyecto Python empaquetado con pyproject.toml y wheel en dist/" width="960" height="540" loading="lazy" decoding="async" />
<figcaption>Resultado buscado: metadatos en <code>pyproject.toml</code>, artefactos en <code>dist/</code> — Emmanuel Sauvage, Robot Éducatif, octubre 2026.</figcaption>
</figure>

## 4. Versiones y dependencias

**Semantic versioning** usa **`MAJOR.MINOR.PATCH`** (p. ej. **`1.2.3`**). En **`dependencies`**, **`~=`**, **`>=`**, **`<`** guían el **resolvedor** de **`pip`**.

## Mini-proyecto guiado: comando `salutcli`

Objetivo: paquete instalable que saluda por nombre. Unos **30–40 minutos**.

### Estructura (`src/`)

```text
salutcli/
├── pyproject.toml
├── README.md
└── src/
    └── salutcli/
        ├── __init__.py
        └── cli.py
```

**`src/salutcli/cli.py`**:

```python
import sys

def main() -> None:
    nombre = sys.argv[1] if len(sys.argv) > 1 else "mundo"
    print(f"¡Hola, {nombre}!")

if __name__ == "__main__":
    main()
```

**`pyproject.toml`** (ejemplo completo):

```toml
[build-system]
requires = ["setuptools>=61"]
build-backend = "setuptools.build_meta"

[project]
name = "salutcli"
version = "0.1.0"
requires-python = ">=3.10"
dependencies = []

[project.scripts]
salutcli = "salutcli.cli:main"

[tool.setuptools.packages.find]
where = ["src"]
```

### Pasos (en la carpeta `salutcli/`)

1. Crea la estructura y los archivos.
2. venv activo → **`pip install -e .`**
3. **`salutcli Ada`** → `¡Hola, Ada!`
4. Edita `cli.py` sin reinstalar.
5. **`python -m build`** (antes **`pip install build`** si hace falta).
6. Revisa **`dist/`** (`.whl` y `.tar.gz`).
7. (Opcional) En venv **nuevo**: **`pip install dist/salutcli-0.1.0-py3-none-any.whl`**.

**Comprobación:** **`pip show salutcli`**.

## Solución de problemas

| Síntoma | Pista |
| --- | --- |
| `ModuleNotFoundError` | `where = ["src"]` y paquete bajo `src/`; [venv y pip](/python-inter-venv-pip/) |
| Comando no encontrado | Reactivar venv; Windows: terminal nuevo |
| Fallo en build | `pip install build`; sintaxis TOML |
| Versión incorrecta | Sube `version` o `pip uninstall salutcli` |
| Import erróneo desde cwd | Layout **`src/`** |
| `ERROR: File "setup.py" not found` | Con solo **`pyproject.toml`**, usa **`python -m build`**, no **`setup.py`** |
| `twine upload` rechazado | Versión, TestPyPI vs producción, **2FA** |

## Preguntas frecuentes

**¿Necesito PyPI para aprender?** No. Wheel local y **`pip install`** bastan.

**¿Wheel o sdist?** El **wheel** se instala tal cual; el **sdist** se reconstruye desde el código fuente.

**¿Sigue haciendo falta `setup.py`?** En proyectos nuevos basta **`pyproject.toml`** con setuptools ≥ 61.

## Recursos externos

- **[Packaging Python](https://packaging.python.org/)**
- **[PEP 621](https://peps.python.org/pep-0621/)**
- **[setuptools](https://setuptools.pypa.io/)**

## Ejercicios (20)

### Nivel sencillo

**Ejercicio 1** — Los **dos** artefactos de **`python -m build`**. <span class="exo-badge exo-badge--simple">Sencillo</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar la solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">.whl (wheel) y .tar.gz (sdist)</code></pre>
</div>
</details>

**Ejercicio 2** — **`pip install -e .`**. <span class="exo-badge exo-badge--simple">Sencillo</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar la solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Instalación editable: enlaza las fuentes; cambios en src/ sin reinstalar.</code></pre>
</div>
</details>

**Ejercicio 3** — CLI **`foo`** → **`pkg.cli:main`**. <span class="exo-badge exo-badge--simple">Sencillo</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar la solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-toml">[project.scripts]
foo = "pkg.cli:main"</code></pre>
</div>
</details>

**Ejercicio 4** — **`install_requires`** vs **`[project] dependencies`**. <span class="exo-badge exo-badge--simple">Sencillo</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar la solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># PEP 621 unifica en [project]; setuptools mapea a metadatos del wheel.</code></pre>
</div>
</details>

**Ejercicio 5** — Layout **`src/`**. <span class="exo-badge exo-badge--simple">Sencillo</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar la solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Evita importar el paquete equivocado desde el directorio actual.</code></pre>
</div>
</details>

**Ejercicio 6** — **`MANIFEST.in`**. <span class="exo-badge exo-badge--simple">Sencillo</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar la solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Incluir archivos no Python en el sdist.</code></pre>
</div>
</details>

**Ejercicio 7** — **`optional-dependencies`** **`dev`**. <span class="exo-badge exo-badge--simple">Sencillo</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar la solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-toml">[project.optional-dependencies]
dev = ["pytest>=7"]</code></pre>
</div>
</details>

### Nivel intermedio

**Ejercicio 8** — **`pip install ".[dev]"`**. <span class="exo-badge exo-badge--inter">Intermedio</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar la solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">pip install ".[dev]"</code></pre>
</div>
</details>

**Ejercicio 9** — **`__version__`** vs **`importlib.metadata`**. <span class="exo-badge exo-badge--inter">Intermedio</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar la solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># metadata lee la versión instalada desde los metadatos del dist.</code></pre>
</div>
</details>

**Ejercicio 10** — **`requires-python = ">=3.10"`**. <span class="exo-badge exo-badge--inter">Intermedio</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar la solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-toml">requires-python = ">=3.10"</code></pre>
</div>
</details>

**Ejercicio 11** — **`twine upload`** y PyPI. <span class="exo-badge exo-badge--inter">Intermedio</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar la solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Herramienta dedicada con comprobaciones y subidas seguras.</code></pre>
</div>
</details>

**Ejercicio 12** — **`packages`** vs **`find:`**. <span class="exo-badge exo-badge--inter">Intermedio</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar la solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># find descubre subpaquetes automáticamente.</code></pre>
</div>
</details>

**Ejercicio 13** — **Build backend** alternativo. <span class="exo-badge exo-badge--inter">Intermedio</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar la solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-text">hatchling, flit, poetry-core, pdm-backend</code></pre>
</div>
</details>

**Ejercicio 14** — **`LICENSE`**. <span class="exo-badge exo-badge--inter">Intermedio</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar la solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Aclara derechos de reutilización.</code></pre>
</div>
</details>

**Punto de control:** dominar el mini-proyecto antes de los ejercicios 15–20.

### Nivel difícil

**Ejercicio 15** — **`setuptools-scm`**. <span class="exo-badge exo-badge--hard">Difícil</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar la solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-toml">[project]
dynamic = ["version"]

[tool.setuptools_scm]</code></pre>
<p>Versión derivada de etiquetas Git (p. ej. <code>v1.2.3</code> → <code>1.2.3</code>).</p>
</div>
</details>

**Ejercicio 16** — Resolvedor **`pip`**. <span class="exo-badge exo-badge--hard">Difícil</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar la solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Backtracking sobre restricciones.</code></pre>
</div>
</details>

**Ejercicio 17** — **`package-data`**. <span class="exo-badge exo-badge--hard">Difícil</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar la solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-toml">[tool.setuptools.package-data]
"pkg" = ["data/*.json"]</code></pre>
</div>
</details>

**Ejercicio 18** — **`--no-deps`**. <span class="exo-badge exo-badge--hard">Difícil</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar la solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Entorno incompleto; fallo si faltan dependencias.</code></pre>
</div>
</details>

**Ejercicio 19** — **`uv`** / **`pip-tools`**. <span class="exo-badge exo-badge--hard">Difícil</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar la solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Resolución reproducible con hashes.</code></pre>
</div>
</details>

**Ejercicio 20** — **Namespace packages**. <span class="exo-badge exo-badge--hard">Difícil</span>

```text
empresa_plugins/
  ├── auth/      ← wheel A
  └── informes/  ← wheel B
# import empresa.auth tras instalar ambos paquetes
```

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar la solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Plugins bajo el mismo espacio de nombres lógico (varios wheels).</code></pre>
</div>
</details>

## Fin del recorrido avanzado

Proyecto guiado: [hub journal CLI](/programmation/projet-python-avance-journal/) — aplicación en [capítulo packaging 6/6](/projet-av-journal-6-package-pyproject/) (comandos independientes del idioma del artículo).

## Para seguir

- [pathlib](/es/python-pathlib/)
- [Tipos y entrada](/es/python-tipos-y-entrada/)
- [Mini-juego en terminal](/es/python-mini-juego-terminal/)
- [Hub Python avanzado](/programmation/python-avance/)
- [Hub intermedio](/programmation/python-intermediaire/)
- [venv y pip](/python-inter-venv-pip/)

## Amazon (afiliado)

Consulta el **precio actual** en la ficha. Enlace de afiliado — comisión posible sin coste extra para ti.

- <a href="/go/az-es-9d5471b875" rel="sponsored nofollow noopener" class="affiliate-link">Libros Python packaging en Amazon.es</a> — verifica edición antes de comprar.

*Emmanuel Sauvage — actualizado el 31 de octubre de 2026.*
