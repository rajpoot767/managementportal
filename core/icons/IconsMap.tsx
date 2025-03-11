import AddIcon from "./AddIcon";
import CloseLeadIcon from "./CloseLeadIcon";
import CloseMatchIcon from "./CloseMatchIcon";
import DeleteIcon from "./DeleteIcon";
import LeadIcon from "./LeadIcon";
import MatchIcon from "./MatchIcon";
import RightArrowIcon from "./RightArrowIcon";
import TemplateIcon from "./TemplateIcon";

interface IconMapInterface {
    [key: string]: React.FunctionComponent<IconProps>;
}

const IconsMap: IconMapInterface = {
    deleteIcon: DeleteIcon,
    matchIcon: MatchIcon,
    addIcon: AddIcon,
    templateIcon: TemplateIcon,
    rightArrowIcon: RightArrowIcon,
    closeMatchIcon :CloseMatchIcon,
    leadIcon:LeadIcon,
    closeLeadIcon:CloseLeadIcon
};

export default IconsMap;