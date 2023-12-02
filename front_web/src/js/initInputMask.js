import InputMask from "@/assets/inputmask.min";

function initInputMask(telElement) {
    if (telElement) {
        const TelMask = new InputMask('+38(099)-999-99-99');
        TelMask.mask(telElement);
    }
}

export default initInputMask;