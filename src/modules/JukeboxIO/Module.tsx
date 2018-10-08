import { R20Module } from "../../tools/R20Module"
import { R20 } from "../../tools/R20";
import { saveAs } from 'save-as'
import {IOModuleCommon} from "../IOModuleCommon";
import {IResult} from "../../tools/Result";
import {IApplyableJukeboxPlaylist, JukeboxIO} from "../../tools/JukeboxIO";

class JukeboxIOModule extends IOModuleCommon<IApplyableJukeboxPlaylist> {
    constructor() {
        super(__dirname, "r20es-jukebox-io-widget", "Import/Export Jukebox", "Select Playlists", null);
    }

    protected continueImporting(finalData: IApplyableJukeboxPlaylist[]) {
        JukeboxIO.applyData(finalData);
    }

    protected nameGetter(d: IApplyableJukeboxPlaylist): string {
        return d.name;
    }

    protected descGetter(d: IApplyableJukeboxPlaylist): string {
        return d.songs.map(s => s.title).join(" ; ");
    }

    protected getExportData(): IApplyableJukeboxPlaylist[] {
        return JukeboxIO.makeApplyablePlaylists(R20.getJukeboxPlaylists());
    }

    protected injectWidget(widget: HTMLElement) {
        const $before = $("#sortrootjukeboxalpha");
        const root = $before[0].parentNode;

        root.insertBefore(widget, $before[0]);
    }

    protected serializeExportData(finalData: IApplyableJukeboxPlaylist[]): { json: string; filename: string } {
        return {
            filename: "playlists.json",
            json: JukeboxIO.serialize(finalData)
        };
    }

    protected tryDeserialize(data: string): IResult<IApplyableJukeboxPlaylist[], string> {
        return JukeboxIO.deserialize(data);
    }
}

if (R20Module.canInstall()) new JukeboxIOModule().install();

