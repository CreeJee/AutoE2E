import * as Platform from './Platform';
export class Machine {
    // OR STORE DB
    // RFC는 tgrid로 하도록 하자
    DRIVER_MAP = new Map([
        [`${Platform.OS.WINDOWS_10}/${Platform.MEDIA_TYPE.Chrome}`,'DOCKER_IMAGE_ADDRESS_HERE']
    ]);
    async launchDriver(platformInfo: Platform.Environment, extra: string, connection?: string) {
        
    }
    addDriver(platformInfo: Platform.Environment, imageAddress: string) {

    }
}