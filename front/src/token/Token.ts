const base64UrlDecode = (str: string) => {
  const base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  const padding = "=".repeat((4 - (base64.length % 4)) % 4);
  const completeBase64 = base64 + padding;

  const decoded = atob(completeBase64);
  return JSON.parse(decodeURIComponent(escape(decoded))); // UTF-8 디코딩 후 JSON 파싱
};

export const getUsername = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const payload = token.split(".")[1]; // 두 번째 부분(페이로드) 가져오기
  if (!payload) return null;

  try {
    const decodedPayload = base64UrlDecode(payload); // Base64Url 디코딩
    return decodedPayload.name; // 'name' 반환
  } catch (error) {
    console.error("디코딩 오류:", error);
    return null;
  }
};
