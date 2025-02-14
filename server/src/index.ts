import colors from 'colors';
import app from "./server";


const port: string | number = process.env.PORT || 4000

app.listen(port, () => {
    console.log(colors.blue.italic("server listening on: " + port));
});