const domContainer = document.getElementById("root");
const root = ReactDOM.createRoot(domContainer);

const img =
    <img src={"./logo_smalltxt.jpg"} width={"256"} height={"256"}></img>;

const page = (
    <div>
        {img}
        <h1>React Example</h1>
        <ul>
            <li>React is a JS frontend framework</li>
            <li>Joel is a great programmer</li>
            <li>Work should not be boring :)</li>
        </ul>
    </div>
);

root.render(page);