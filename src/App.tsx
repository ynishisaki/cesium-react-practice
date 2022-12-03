import {
    Viewer,
    Entity,
    PointGraphics,
    EntityDescription,
    ImageryLayer,
} from "resium";
import { Cartesian3 } from "cesium";
import * as Cesium from "cesium";

// Cesium Ionの読み込み指定
Cesium.Ion.defaultAccessToken = process.env.REACT_APP_CESIUM_ACCESS_TOKEN!; // もうちょっとよい書き方ないかな

// Terrainの指定（EGM96、国土数値情報5m標高から生成した全国の地形モデル、5m標高データが無い場所は10m標高で補完している）
const terrainProvider = new Cesium.CesiumTerrainProvider({
    url: Cesium.IonResource.fromAssetId(
        parseInt(process.env.REACT_APP_CESIUM_ASSET_ID!)
    ),
});

// G空間情報センターに置かれている、Project PLATEAUで作成したPLATEAUオルソの参照
const imageProvider = new Cesium.UrlTemplateImageryProvider({
    url: process.env.REACT_APP_CESIUM_ORTHO_IMAGE_TILE_URL!,
    maximumLevel: 19,
});

const position = Cartesian3.fromDegrees(-74.0707383, 40.7117244, 100);

function App() {
    return (
        <Viewer full terrainProvider={terrainProvider}>
            <ImageryLayer imageryProvider={imageProvider} />
            <Entity position={position} name='Tokyo'>
                <PointGraphics pixelSize={10} />
                <EntityDescription>
                    <h1>マークダウンでかけちゃうよ</h1>
                    <p>Population: 9,273,000</p>
                    <h2>やっほい</h2>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                </EntityDescription>
            </Entity>
        </Viewer>
    );
}

export default App;
