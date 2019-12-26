export const enum OS{
    UNKNOWN = -99,
    CUSTOM = -1,
    WINDOWS_XP,
    WINDOWS_7,
    WINDOWS_8,
    WINDOWS_10,
    UBUNTU,
    ANDROID_KITKAT = 19,
    ANDROID_LOLLIPOP = 20,
    ANDROID_MARSHMALLOW = 22,
    ANDROID_NOUGAT = 24,
    ANDROID_OREO = 26,
    ANDROID_PIE = 28,
    ANDROID_10 = 29,
    //멕 및 IOS는 버전추가예정
    IOS_8_4,
    IOS_9_4,
    IOS_10_3,
    IOS_11_4,
    IOS_12_2,
    IOS_13_1,
    MAC_OS_10_14,
    MAC_OS_10_15,

}
export const enum MEDIA_TYPE{
    Naver,
    Samsung,
    Chrome,
    Firefox,
    Opera,
    Safari,
    Kakao,
    Whele,
    Edge,
    IE,
    Vivaldi,
    UC,
    APP,
    BINARY, //support only x,y position
    CUSTOM
}
export type Environment = {
    os: OS,
    type: MEDIA_TYPE,
    mediaVersion: number,
    width: number,
    height: number,
    extra: object
}