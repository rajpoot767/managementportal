import AddIcon from "./AddIcon";
import CloseLeadIcon from "./CloseLeadIcon";
import CloseMatchIcon from "./CloseMatchIcon";
import DeleteIcon from "./DeleteIcon";
import LeadIcon from "./LeadIcon";
import MatchIcon from "./MatchIcon";
import RightArrowIcon from "./RightArrowIcon";
import TemplateIcon from "./TemplateIcon";
import HospitalIcon from "./HospitalIcon";
import DashboardIcon from "./DashboardIcon";
import DepartmentIcon from "./DepartmentIcon";
import DoctorIcon from "./DoctorIcon";
import SearchIcon from "./SearchIcon";
import EmailIcon from "./EmailIcon";
import PhoneIcon from "./PhoneIcon";
import MenuIcon from "./MenuIcon";
import EditIcon from "./EditIcon";
import PermissionsIcon from "./PermissionsIcon";

interface IconMapInterface {
    [key: string]: React.FunctionComponent<IconProps>;
}

const IconsMap: IconMapInterface = {
    deleteIcon: DeleteIcon,
    matchIcon: MatchIcon,
    addIcon: AddIcon,
    templateIcon: TemplateIcon,
    rightArrowIcon: RightArrowIcon,
    closeMatchIcon: CloseMatchIcon,
    leadIcon: LeadIcon,
    closeLeadIcon: CloseLeadIcon,
    hospitalIcon: HospitalIcon,
    dashboardIcon: DashboardIcon,
    departmentIcon: DepartmentIcon,
    doctorIcon: DoctorIcon,
    searchIcon: SearchIcon,
    emailIcon: EmailIcon,
    phoneIcon: PhoneIcon,
    menuIcon: MenuIcon,
    editIcon: EditIcon,
    permissionsIcon: PermissionsIcon
};

export default IconsMap;