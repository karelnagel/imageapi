import { CompProps } from "..";

export const DEFAULT_COMPONENTS: CompProps[] = [
    {
        id: "bg",
        type: "image",
        height: 0,
        width: 0,
        x: 0,
        y: 0,
        objectFit: "cover",
        rotation: 0,
        borderRadius: 0,
        src: "https://picsum.photos/seed/13/1920/1080",
        duration: 0, from: 0,
    },
    {
        id: "container",
        type: "div",
        height: 400,
        width: 600,
        rotation: 0,
        x: 240,
        y: 340,
        backgroundColor: "#FFFFFFFF",
        borderRadius: 30,
        duration: 0, from: 0,
        children: [
            {
                id: "profile_image",
                type: "image",
                height: 80,
                width: 80,
                x: 20,
                y: 20,
                objectFit: "cover",
                rotation: 0,
                borderRadius: 1000,
                src: "https://picsum.photos/seed/2/80/80",
                duration: 0, from: 0,
            },
            {
                id: "name",
                type: "text",
                height: 28,
                width: 500,
                x: 120,
                y: 27,
                textStyle: {
                    backgroundColor: "#00000000",
                    color: "#000000FF",
                    fontSize: 28,
                    fontFamily: "Inter",
                    fontWeight: 700,
                    textAlign: "left",
                },
                borderRadius: 0,
                rotation: 0,
                text: "Your mom",
                duration: 0, from: 0,
            },
            {
                id: "username",
                type: "text",
                height: 30,
                width: 500,
                x: 120,
                y: 62,
                textStyle: {
                    backgroundColor: "#00000000",
                    color: "#000000FF",
                    fontSize: 24,
                    fontFamily: "Inter",
                    fontWeight: 500,
                    textAlign: "left",
                },
                borderRadius: 0,
                rotation: 0,
                text: "@yourmom",
                duration: 0, from: 0,
                componentAnimations: [],
            },
            {
                id: "tweet",
                type: "text",
                height: 200,
                width: 550,
                x: 25,
                y: 130,
                borderRadius: 0,
                textStyle: {
                    color: "#000000FF",
                    fontSize: 24,
                    fontFamily: "Inter",
                    fontWeight: 500,
                    textAlign: "left",
                },
                rotation: 0,
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
                duration: 1, from: 0.2,
                componentAnimations: [],
            }
        ]
    }
]