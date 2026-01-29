ignore_dirs="node_modules|.git|__pycache__|.venv|dist|build"

find . -type d | grep -E -v "($ignore_dirs)" | sort | \
while read dir; do
    level=$(echo $dir | tr -cd '/' | wc -c)
    indent=$(printf "%${level}s" "" | tr ' ' '|   ')
    echo "${indent}${dir##*/}"
    
    # Показать файлы в каталоге (опционально)
    find "$dir" -maxdepth 1 -type f ! -name ".*" 2>/dev/null | \
    while read file; do
        echo "${indent}|   \\-- ${file##*/}"
    done
done