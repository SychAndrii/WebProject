document.querySelector('.header-mode').addEventListener('click', function(event) {
    event.preventDefault();
    let wantedMode = this.classList.contains('dark-mode-text') ? 'light-mode' : 'dark-mode';
    this.innerHTML = wantedMode == 'dark-mode' ? '&#x263d;' : '&#9788;';
    let currMode = wantedMode == 'light-mode' ? 'dark-mode' : 'light-mode';
    let newClass;
    document.querySelectorAll('[class*=' + currMode + ']').forEach( (elem) => {
        let classestoAdd = [];
        let classesToRemove = [];
        for(let cl of elem.classList) {
            if(cl.startsWith(currMode)) {
                newClass = wantedMode + cl.substring(0 + currMode.length, cl.length);
                classesToRemove.push(cl);
                classestoAdd.push(newClass);
            }
        }
        for(let cl of classesToRemove) {
            elem.classList.remove(cl);
        }
        for(let cl of classestoAdd) {
            elem.classList.add(cl);
        }
    })});