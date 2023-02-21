const y_btns = document.querySelectorAll("fieldset.cmd-buttons>input[type=button]");
const r_checkboxes = document.querySelectorAll("fieldset.r-checkbox-group input[type=checkbox]");
const x_input = document.getElementById("j_idt7:x-input");
const hidden_r_input = document.querySelector("div#hidden-input-r>input");
const hidden_y_input = document.querySelector("div#hidden-input-y>input");
const send_btn = document.getElementById("j_idt7:send-btn");

y_btns.forEach((btn) => {
    btn.onclick = () => {
        if (btn.classList.contains("active"))
            return;
        hidden_y_input.value = btn.value;
        y_btns.forEach((b)=>{
             b.classList.remove("active");
        });
        btn.classList.add("active");
        console.log("set to hidden y "+hidden_y_input);
    }
})

r_checkboxes.forEach((checkbox) => {
    checkbox.onchange = () => {
        if (!checkbox.checked) {
            checkbox.checked = true;
            return;
        }
        r_checkboxes.forEach((cb) => {
            if (checkbox.title !== cb.title)
                cb.checked = false;
        })
        hidden_r_input.value = checkbox.title;
        redraw(canvas.getContext('2d'));
        console.log("set to hidden r "+hidden_r_input.value);
    }
});