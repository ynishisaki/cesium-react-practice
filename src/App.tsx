import { Viewer, Entity, PointGraphics, EntityDescription } from "resium";
import { Cartesian3 } from "cesium";
import * as Cesium from "cesium";

// Cesium Ionの読み込み指定
if (typeof process.env.REACT_APP_CESIUM_ACCESS_TOKEN != "undefined") {
    Cesium.Ion.defaultAccessToken = process.env.REACT_APP_CESIUM_ACCESS_TOKEN;
}

// Terrainの指定（EGM96、国土数値情報5m標高から生成した全国の地形モデル、5m標高データが無い場所は10m標高で補完している）
const terrainProvider = new Cesium.CesiumTerrainProvider({
    url: process.env.REACT_APP_CESIUM_ASSET_ID
        ? Cesium.IonResource.fromAssetId(
              parseInt(process.env.REACT_APP_CESIUM_ASSET_ID)
          )
        : "https://assets.agi.com/stk-terrain/world",
    // undefinedの判定方法をもうちょっとどうにかしたい
    // url: Cesium.IonResource.fromAssetId(
    //     process.env.REACT_APP_CESIUM_ASSET_ID
    //         ? parseInt(process.env.REACT_APP_CESIUM_ASSET_ID)
    //         : 1
    // ),
});
const position = Cartesian3.fromDegrees(-74.0707383, 40.7117244, 100);

function App() {
    return (
        <Viewer full terrainProvider={terrainProvider}>
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
