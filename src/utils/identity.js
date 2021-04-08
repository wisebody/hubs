import { fetchReticulumAuthenticated } from "./phoenix-utils";
import defaultAvatar from "../assets/models/DefaultAvatar.glb";

const names = [
  "단군",
  "온조왕",
  "계백",
  "김유신",
  "문무왕",
  "원효",
  "장보고",
  "대조영",
  "강감찬",
  "서희",
  "의천",
  "정몽주",
  "문익점",
  "최충",
  "일연",
  "최영",
  "황희",
  "장영실",
  "율곡",
  "이황",
  "신사임당",
  "곽재우",
  "조헌",
  "김시민",
  "이순신",
  "권율",
  "홍길동",
  "임꺽정",
  "한석봉",
  "황진이",
  "김홍도",
  "김삿갓",
  "김정호",
  "정약용",
  "전봉준",
  "김대건",
  "안중근",
  "윤동주",
  "지석영",
  "손병희",
  "유관순",
  "안창호",
  "방정환",
  "이수일",
  "심순애",
  "김두한",
  "이중섭"
];

function chooseRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateRandomName() {
  return `${chooseRandom(names)}-${Math.floor(10 + Math.random() * 10)}`;
}

export async function fetchRandomDefaultAvatarId() {
  const defaultAvatarEndpoint = "/api/v1/media/search?filter=default&source=avatar_listings";
  const defaultAvatars = (await fetchReticulumAuthenticated(defaultAvatarEndpoint)).entries || [];
  if (defaultAvatars.length === 0) {
    // If reticulum doesn't return any default avatars, just default to the duck model. This should only happen
    // when running against a fresh reticulum server, e.g. a local ret instance.
    return new URL(defaultAvatar, location.href).href;
  }
  const avatarIds = defaultAvatars.map(avatar => avatar.id);
  return chooseRandom(avatarIds);
}
