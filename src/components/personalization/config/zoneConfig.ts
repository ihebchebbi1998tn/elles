interface Zone {
  left: number;
  top: number;
  width: number;
  height: number;
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
}

interface ProductFaceZone {
  sideId: string;
  zone: Zone;
}

export interface ProductZoneConfig {
  id: string;
  faces: ProductFaceZone[];
}

export const productZoneConfigs: ProductZoneConfig[] = [
  {
    id: "tshirts",
    faces: [
      {
        sideId: "front",
        zone: {
          left: 150,
          top: 150,
          width: 200,
          height: 200,
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderColor: "#cccccc",
          borderWidth: 1
        }
      },
      {
        sideId: "back",
        zone: {
          left: 150,
          top: 150,
          width: 200,
          height: 200,
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderColor: "#cccccc",
          borderWidth: 1
        }
      }
    ]
  },
  {
    id: "blouses",
    faces: [
      {
        sideId: "front",
        zone: {
          left: 150,
          top: 150,
          width: 200,
          height: 200,
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderColor: "#cccccc",
          borderWidth: 1
        }
      },
      {
        sideId: "back",
        zone: {
          left: 150,
          top: 150,
          width: 200,
          height: 200,
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderColor: "#cccccc",
          borderWidth: 1
        }
      }
    ]
  },
  {
    id: "mugs",
    faces: [
      {
        sideId: "front",
        zone: {
          left: 150,
          top: 150,
          width: 200,
          height: 150,
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderColor: "#cccccc",
          borderWidth: 1
        }
      }
    ]
  },
  {
    id: "flyers",
    faces: [
      {
        sideId: "front",
        zone: {
          left: 100,
          top: 100,
          width: 300,
          height: 300,
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderColor: "#cccccc",
          borderWidth: 1
        }
      },
      {
        sideId: "back",
        zone: {
          left: 100,
          top: 100,
          width: 300,
          height: 300,
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderColor: "#cccccc",
          borderWidth: 1
        }
      }
    ]
  },
  {
    id: "notebooks",
    faces: [
      {
        sideId: "front",
        zone: {
          left: 150,
          top: 150,
          width: 200,
          height: 250,
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderColor: "#cccccc",
          borderWidth: 1
        }
      }
    ]
  },
  {
    id: "bags",
    faces: [
      {
        sideId: "front",
        zone: {
          left: 150,
          top: 150,
          width: 200,
          height: 200,
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderColor: "#cccccc",
          borderWidth: 1
        }
      },
      {
        sideId: "back",
        zone: {
          left: 150,
          top: 150,
          width: 200,
          height: 200,
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderColor: "#cccccc",
          borderWidth: 1
        }
      }
    ]
  }
];
