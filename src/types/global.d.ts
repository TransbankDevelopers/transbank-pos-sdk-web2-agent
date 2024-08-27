interface ElectronAPI {
    onUpdateClientCount: (callback: (count: number) => void) => void;
    onUpdateClientLog: (callback: (data: string) => void) => void;
}

interface Window {
    electronAPI: ElectronAPI;
}