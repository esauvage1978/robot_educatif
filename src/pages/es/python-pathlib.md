---
layout: ../../layouts/EsPost.astro
title: "Python pathlib: rutas y archivos (Path, UTF-8, glob)"
description: "Tutorial pathlib: Path, rutas portables, UTF-8, glob. 20 ejercicios. Funciona con simples archivos Python — no necesitas robot."
updated: "31 de octubre de 2026"
---

Algunos enlaces de esta página son de afiliados. Si compras a través de ellos, podemos recibir una comisión sin coste extra para ti.

Tratar las rutas como **simples cadenas** (`"carpeta" + "\\" + "archivo.txt"`) lleva rápido a errores: separadores **Windows** (`\`) vs **POSIX** (`/`), dobles barras, rutas **relativas** ambiguas según el directorio actual, y olvidos de **codificación** al leer. El módulo **`pathlib`** (biblioteca estándar, estable desde Python 3.4+) propone objetos **`Path`** que **representan** una ruta de forma abstracta y luego la **renderizan** correctamente para el sistema cuando hace falta.

Un **`Path`** sabe **componerse** con el operador **`/`** (sobrecargado), listar un directorio, probar **archivo** vs **carpeta**, leer o escribir **texto** en una línea. Se ha convertido en el enfoque **recomendado** para el **código nuevo**; el módulo antiguo **`os.path`** sigue siendo legible en código legacy, pero **`pathlib`** unifica la API y mejora la **legibilidad**.

## 1. Crear y componer una ruta

**`Path("relativo")`** apunta respecto al directorio de trabajo actual; **`Path("/absoluto")`** (en Unix) o **`Path("C:/Users/...")`** (en Windows) fijan una raíz. El operador **`/`** evita concatenaciones manuales: cada segmento es un trozo de la ruta y la representación final respeta el SO.

```python
from pathlib import Path
root = Path(".")
file = root / "data" / "notes.txt"
```

**Buenas prácticas**: en **código nuevo**, prioriza **`pathlib.Path`** y **`/`** en lugar de **`os.path.join`** repetido. Para rutas **sin acceso a disco** (lógica pura) existe **`PurePath`**, pero **`Path`** basta la mayoría de las veces.

## 2. Leer y escribir texto

Los métodos **`read_text`** y **`write_text`** encapsulan la apertura del archivo y la lectura/escritura **completa** en memoria — prácticos para archivos **pequeños o medianos** (config, export). Para archivos muy grandes, preferir streaming (`open()` o `Path.open()`).

```python
p = Path("hello.txt")
p.write_text("Hola\n", encoding="utf-8")
print(p.read_text(encoding="utf-8"))
```

**Codificación**: en Windows, la codificación por defecto histórica no siempre es UTF-8; **imponer explícitamente `encoding="utf-8"`** para el texto evita **`UnicodeDecodeError`** al desplegar en otro SO.

## 3. Existencia, tipo y resolución

Antes de leer, a menudo comprobamos **`exists()`**; **`is_file()`** e **`is_dir()`** distinguen archivo y carpeta. **`resolve()`** puede devolver una ruta **absoluta** y **normalizada** (resolución de `..`), útil para comparar dos rutas o mostrarlas con claridad.

```python
if p.exists():
    print("encontrado")
if p.is_file():
    ...
```

## 4. Recorrer una carpeta y patrones (`glob`)

**`iterdir()`** enumera los **hijos directos** de un directorio. **`glob("**/*.py")`** o **`rglob("*.py")`** aplican **patrones** recursivos — prácticos para tratar todos los archivos de un tipo sin escribir un bucle `os.walk` manual.

```python
for child in Path(".").iterdir():
    print(child.name)
```

**Buenas prácticas**: no olvides que **`glob`** depende del **contenido real del disco**; en tests, aísla a menudo un **directorio temporal** (`tmp_path` con **pytest**) para seguir siendo reproducible.

## Recursos externos

- **[pathlib — documentación oficial (EN)](https://docs.python.org/3/library/pathlib.html)**: tipos `Path`, `PurePath`, métodos.
- **[Tabla pathlib ↔ os.path (EN)](https://docs.python.org/3/library/pathlib.html#corresponding-tools)**: equivalencias oficiales.
- **[open() y encoding (doc oficial, EN)](https://docs.python.org/3/library/functions.html#open)**: recordatorio sobre `encoding` y modo texto.

## Ejercicios (20)

### Índice de ejercicios

- [Nivel sencillo (1–7)](#nivel-sencillo)
- [Nivel intermedio (8–14)](#nivel-intermedio)
- [Nivel difícil (15–20)](#nivel-difícil)


Los ejercicios fijan los **reflejos**: composición con **`/`**, **UTF-8**, pruebas de existencia. Las **soluciones** están ocultas por defecto.

### Nivel sencillo

**Ejercicio 1** — Crea **`Path("a.txt")`** y muestra su **representación** con **`print`**. <span class="exo-badge exo-badge--simple">Sencillo</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar la solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path
print(Path("a.txt"))</code></pre>
</div>
</details>

**Ejercicio 2** — Construye la ruta **`folder/sub/file.txt`** con el operador **`/`** a partir de **`Path("folder")`**. <span class="exo-badge exo-badge--simple">Sencillo</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar la solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path
p = Path("folder") / "sub" / "file.txt"
print(p)</code></pre>
</div>
</details>

**Ejercicio 3** — Escribe **`"hi"`** en **`out.txt`** con **`write_text`** y **`encoding="utf-8"`**. <span class="exo-badge exo-badge--simple">Sencillo</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar la solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path
Path("out.txt").write_text("hi", encoding="utf-8")</code></pre>
</div>
</details>

**Ejercicio 4** — Lee el contenido de **`out.txt`** con **`read_text`**. <span class="exo-badge exo-badge--simple">Sencillo</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar la solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path
print(Path("out.txt").read_text(encoding="utf-8"))</code></pre>
</div>
</details>

**Ejercicio 5** — Comprueba si **`data.txt`** existe con **`.exists()`**. <span class="exo-badge exo-badge--simple">Sencillo</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar la solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path
print(Path("data.txt").exists())</code></pre>
</div>
</details>

**Ejercicio 6** — Muestra el **nombre de archivo solo** (**`name`**) para **`/tmp/a/b.txt`** (usa **`Path`**). <span class="exo-badge exo-badge--simple">Sencillo</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar la solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path
print(Path("/tmp/a/b.txt").name)</code></pre>
</div>
</details>

**Ejercicio 7** — Muestra la **carpeta padre** con **`.parent`** para **`Path("folder/file.py")`**. <span class="exo-badge exo-badge--simple">Sencillo</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar la solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path
print(Path("folder/file.py").parent)</code></pre>
</div>
</details>

### Nivel intermedio

**Ejercicio 8** — Lista los **archivos** del directorio actual cuyo sufijo es **`.txt`** (bucle **`iterdir`** + prueba **`.suffix`**). <span class="exo-badge exo-badge--inter">Intermedio</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar la solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path
for p in Path(".").iterdir():
    if p.is_file() and p.suffix == ".txt":
        print(p)</code></pre>
</div>
</details>

**Ejercicio 9** — Usa **`glob("*.py")`** en la carpeta actual para listar los **`.py`**. <span class="exo-badge exo-badge--inter">Intermedio</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar la solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path
for p in Path(".").glob("*.py"):
    print(p)</code></pre>
</div>
</details>

**Ejercicio 10** — Crea una carpeta **`tmp`** con **`Path("tmp").mkdir(exist_ok=True)`**. <span class="exo-badge exo-badge--inter">Intermedio</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar la solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path
Path("tmp").mkdir(exist_ok=True)</code></pre>
</div>
</details>

**Ejercicio 11** — Resuelve una ruta **absoluta** con **`.resolve()`** a partir de **`Path("README.md")`**. <span class="exo-badge exo-badge--inter">Intermedio</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar la solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path
print(Path("README.md").resolve())</code></pre>
</div>
</details>

**Ejercicio 12** — Buena práctica: explica por qué `Path / "a" / "b"` vale más que concatenar cadenas `"a" + "/" + "b"` en rutas de usuario. <span class="exo-badge exo-badge--inter">Intermedio</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar la solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Path normaliza los separadores según el SO y evita dobles barras u omisiones.</code></pre>
</div>
</details>

**Ejercicio 13** — Abre en **binario** con **`Path`**: **`Path("b.bin").read_bytes()`** (o **`write_bytes`**). Muestra la longitud de los bytes leídos. <span class="exo-badge exo-badge--inter">Intermedio</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar la solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path
p = Path("b.bin")
p.write_bytes(b"\x00\x01")
print(len(p.read_bytes()))</code></pre>
</div>
</details>

**Ejercicio 14** — Recorre **`rglob("*.md")`** desde **`Path(".")`** para encontrar **Markdown** de forma recursiva (cuidado con el rendimiento en árboles grandes). <span class="exo-badge exo-badge--inter">Intermedio</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar la solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path
for p in Path(".").rglob("*.md"):
    print(p)</code></pre>
</div>
</details>

### Nivel difícil

**Ejercicio 15** — Función **`read_if_exists(path: str) -> str | None`**: devuelve el texto o **`None`** si el archivo no existe (**`FileNotFoundError`** gestionado correctamente). <span class="exo-badge exo-badge--hard">Difícil</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar la solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path

def read_if_exists(path: str):
    p = Path(path)
    if not p.exists():
        return None
    return p.read_text(encoding="utf-8")</code></pre>
</div>
</details>

**Ejercicio 16** — Renombra **`old.txt`** a **`new.txt`** con **`.rename`**. <span class="exo-badge exo-badge--hard">Difícil</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar la solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path
Path("old.txt").rename(Path("new.txt"))</code></pre>
</div>
</details>

**Ejercicio 17** — Cuenta las líneas de un archivo de texto con **`read_text`** y **`splitlines()`** (archivos vacíos tratados con seguridad). <span class="exo-badge exo-badge--hard">Difícil</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar la solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path
def line_count(p):
    return len(Path(p).read_text(encoding="utf-8").splitlines())</code></pre>
</div>
</details>

**Ejercicio 18** — **`Path.home() / "Documents"`**: ¿para qué sirve **`home()`**? <span class="exo-badge exo-badge--hard">Difícil</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar la solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Directorio personal del usuario (varía según el SO).</code></pre>
</div>
</details>

**Ejercicio 19** — Buena práctica de seguridad: ¿por qué evitar **`eval(Path(...).read_text())`**? <span class="exo-badge exo-badge--hard">Difícil</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar la solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python"># Un archivo de texto puede contener código arbitrario ejecutado: ejecución de código no controlada.</code></pre>
</div>
</details>

**Ejercicio 20** — Escribe una función **`copy_text(src, dst)`** con **`read_text`** / **`write_text`** y **`encoding="utf-8"`** en todas partes. <span class="exo-badge exo-badge--hard">Difícil</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar la solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">from pathlib import Path

def copy_text(src, dst):
    t = Path(src).read_text(encoding="utf-8")
    Path(dst).write_text(t, encoding="utf-8")</code></pre>
</div>
</details>

## Continuación del recorrido

Siguiente paso: [Clases y POO](/python-inter-poo-classes/) — estructurar datos y comportamiento con clases. También en esta serie: [tipos y entrada](/es/python-tipos-y-entrada/) · [juego mayor o menor en la terminal](/es/python-mini-juego-terminal/).

## Mini-proyecto de archivos (pathlib)

Crea una carpeta `sensor_logs/`, escribe tres archivos `.txt` con `Path.write_text(..., encoding="utf-8")`, listalos con `Path("sensor_logs").glob("*.txt")` e imprime el número de líneas de cada uno.

Libros de ejercicios (enlaces de afiliado):

- [Python pathlib / archivos](https://www.amazon.es/s?k=python+pathlib+archivos+libro&tag=roboteducat07-21)

*Autor: Emmanuel Sauvage · actualizado el 31 de octubre de 2026.*
