import style from "./style.module.css";

import {
  TbCircleX as RemoveIcon,
  TbCirclePlus as AddIcon,
  TbPlayerSkipBack as StartTableIcon,
  TbPlayerTrackPrev as PrevTableIcon,
  TbPlayerTrackNext as NextTableIcon,
  TbPlayerSkipForward as EndTableIcon
} from "react-icons/tb";

import Button from "../../resuable/Button";
import Divider from "../../resuable/Divider";

import Direction from "../../../types/Direction";

export default function BottomBar() {
  return (
    <nav className={style.bar}>
      <div className={style.options}>
        <div className={style.selector}>
          <Button>
            <StartTableIcon size={16} />
          </Button>
        </div>

        <div className={style.selector}>
          <Button>
            <PrevTableIcon size={16} />
          </Button>
        </div>

        <div className={style.selector}>
          <Button>
            <NextTableIcon size={16} />
          </Button>
        </div>

        <div className={style.selector}>
          <Button>
            <EndTableIcon size={16} />
          </Button>
        </div>

        <Divider direction={Direction.Column} />

        <div className={style.selector}>
          <Button green>
            <AddIcon size={16} />
          </Button>
        </div>

        <Divider direction={Direction.Column} />

        <div className={style.selector}>
          <Button>Grid1</Button>
          <Button red>
            <RemoveIcon size={16} />
          </Button>
        </div>

        <Divider direction={Direction.Column} />

        <div className={style.selector}>
          <Button>Grid2</Button>
          <Button red>
            <RemoveIcon size={16} />
          </Button>
        </div>

        <Divider direction={Direction.Column} />

        <div className={style.selector}>
          <Button>Grid3</Button>
          <Button red>
            <RemoveIcon size={16} />
          </Button>
        </div>
      </div>
    </nav>
  );
}
