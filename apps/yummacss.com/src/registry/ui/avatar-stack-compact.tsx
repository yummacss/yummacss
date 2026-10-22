import {
  LaptopIcon,
  SmartphoneIcon,
  TabletIcon,
} from "@solar-icons/react/bold";
import Avatar from "./avatar";

export default function AvatarStackCompact() {
  return (
    <div className="d:f ai:c p:px bg:raised btc:rim blc:rim brc:rim bbc:shadow bs-o:xs br:9999 bw:1">
      {devices.map((device, index) => (
        <Avatar
          key={device.name}
          size="sm"
          name={device.name}
          fallback={<device.icon className="w:4 h:4" />}
          className={index > 0 ? "ml:-2" : ""}
        />
      ))}
      <Avatar size="sm" fallback={`+${extraCount}`} className="ml:-2" />
    </div>
  );
}

const devices = [
  { name: "This laptop", icon: LaptopIcon },
  { name: "Phone", icon: SmartphoneIcon },
  { name: "Tablet", icon: TabletIcon },
];

const extraCount = 1;
