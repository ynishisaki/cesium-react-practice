import { Viewer, Entity, PointGraphics, EntityDescription } from "resium";
import { Cartesian3, createWorldTerrain } from "cesium";

const terrainProvider = createWorldTerrain();
const position = Cartesian3.fromDegrees(-74.0707383, 40.7117244, 100);

function App() {
    return (
        <Viewer full terrainProvider={terrainProvider}>
            <Entity position={position} name='Tokyo'>
                <PointGraphics pixelSize={10} />
                <EntityDescription>
                    <h1>マークダウンかけちゃうよ</h1>
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
