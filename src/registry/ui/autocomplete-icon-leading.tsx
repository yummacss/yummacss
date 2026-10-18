import {
  BellIcon,
  GlobeIcon,
  KeyIcon,
  QuestionCircleIcon,
  SettingsIcon,
  UserCrossIcon,
} from "@solar-icons/react/bold";
import { MagnifierIcon } from "@solar-icons/react/outline";
import Autocomplete, { type AutocompleteItem } from "./autocomplete";

export default function AutocompleteIconLeading() {
  return (
    <Autocomplete
      items={settings}
      label="Search settings"
      placeholder="Account, Privacy, & more"
      icon={<MagnifierIcon className="w:4 h:4" />}
      iconPosition="leading"
      emptyMessage="No settings found."
    />
  );
}

const settings: AutocompleteItem[] = [
  { label: "Account Settings", icon: <SettingsIcon className="w:4 h:4" /> },
  { label: "Privacy & Security", icon: <KeyIcon className="w:4 h:4" /> },
  {
    label: "Notifications",
    icon: <BellIcon className="w:4 h:4" />,
  },
  { label: "Language & Region", icon: <GlobeIcon className="w:4 h:4" /> },
  { label: "Blocked Accounts", icon: <UserCrossIcon className="w:4 h:4" /> },
  { label: "Help Center", icon: <QuestionCircleIcon className="w:4 h:4" /> },
];
