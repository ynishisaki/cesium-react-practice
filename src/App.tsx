import {
    Viewer,
    Entity,
    PointGraphics,
    EntityDescription,
    ImageryLayer,
    Cesium3DTileset,
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

// 3D Tiles
// chiyoda-ku
const cesium3DTilesetUrlChiyoda =
    process.env.REACT_APP_CESIUM_3DTILESET_URL_CHIYODA!;
// shinjuku-ku
const cesium3DTilesetUrlShinjuku =
    process.env.REACT_APP_CESIUM_3DTILESET_URL_SHINJUKU!;

// styling 3D Tiles
const cesium3DTileStyle = new Cesium.Cesium3DTileStyle({
    // 駅からの距離に応じて、色を変える
    defines: {
        // 駅からの距離
        distanceFromStation:
            "distance(vec2(${feature['_x']}, ${feature['_y']}), vec2(139.73552409, 35.69106636))",
    },
    color: {
        conditions: [
            ["${distanceFromStation} < 0.005", "color('red')"],
            ["${distanceFromStation} < 0.01", "color('orange')"],
            ["true", "color('yellow')"],
        ],
    },
});

const position = Cartesian3.fromDegrees(139.73552409, 35.69106636, 100);

function App() {
    return (
        <Viewer full terrainProvider={terrainProvider}>
            <ImageryLayer imageryProvider={imageProvider} />
            <Cesium3DTileset
                url={cesium3DTilesetUrlChiyoda}
                style={cesium3DTileStyle}
            />
            <Cesium3DTileset
                url={cesium3DTilesetUrlShinjuku}
                style={cesium3DTileStyle}
            />
            <Entity position={position} name='Tokyo'>
                <PointGraphics pixelSize={10} />
                <EntityDescription>駅ですよ</EntityDescription>
            </Entity>
        </Viewer>
    );
}

export default App;
