interface ElectronAPI {
    onUpdateClientCount: (callback: (count: number) => void) => void;
    onUpdateClientLog: (callback: (data: string) => void) => void;
    onUpdatePosStatus: (callback: (posConnected: boolean) => void) => void;
}

interface Window {
    electronAPI: ElectronAPI;
}