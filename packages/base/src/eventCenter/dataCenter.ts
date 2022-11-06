import EventBus from "@monorepo/share/utils/eventBus";

const eventBus = new EventBus();
eventBus.on("hide", (...data) => {
    console.log("隐藏我", data);
});

export default eventBus;
