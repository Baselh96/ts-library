import { InitForm } from "../../class/initForm";

export function bolUpdateStepButtonMsg(initForm: InitForm, InfoText: string) {
    initForm.bolSteps._infoText = InfoText;
}