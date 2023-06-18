import { useState, useEffect } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { green, purple, orange } from '@mui/material/colors';
import pullData from './util/pullData';
import { summarize, getWidgets, stripWidgetSize } from './util/summarize';
import email_reply from './components/email_reply';
import meetings from './components/meetings';
// import chatbot from './components/chatbot';
import './App.css'
import { Configuration, OpenAIApi } from "openai";

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
console.log(OPENAI_API_KEY);

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const WIDGET_MAPPINGS = {
  email_reply,
  meetings,
}
const BORDER_RADIUS = 6;
const ELEVATION = 8;

for (const [widget, component] of Object.entries(WIDGET_MAPPINGS)) {
  WIDGET_MAPPINGS[widget] = component(1, BORDER_RADIUS, ELEVATION);
  WIDGET_MAPPINGS[`${widget}_large`] = component(2, BORDER_RADIUS, ELEVATION);
  WIDGET_MAPPINGS[`${widget}_xlarge`] = component(3, BORDER_RADIUS, ELEVATION);
}

const theme = createTheme({
  status: {
    danger: orange[500],
  },
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
    background: {
      main: '#ffffff',
    },
    mode: 'dark',
  },
});

function App() {
  const [components, setComponents] = useState([]);  // array of components

  useEffect(() => {
    async function prepareWidgets() {
      const data = await pullData();
      const [briefingSummary, widgets] = await Promise.all([summarize(data), getWidgets(data)]);

      // const layoutSuggestion = await openai.createChatCompletion({
      //   model: "gpt-3.5-turbo-0613",
      //   messages: [
      //     {"role": "system", "content": "You are an assistant that designs widget layouts for a service that presents daily briefings to users based on their emails, calendar events, and more. Based on the user's data (emails, calendar events, etc.), you design a widget layout based on the most important items and things the user should know. You have access to a function to present the widgets that you call by passing the list of widgets. The order of the widgets is sorted by importance, with the most important widget first. You can also define the size of a widget; a larger widget for more important items is probably a good idea. Only include each widget type once, including variants. Do not include a widget and its large version at the same time. Each widget's normal version takes up 1 space, their large versions take up 2 spaces, and their xlarge versions take up 3 spaces. The maximum number of spaces is 12."},
      //     {"role": "user", "content": `Here is a summary of everything I should know:\n${briefingSummary}\n\nLay out my daily briefing.`},
      //   ],
      //   functions: [
      //     {
      //       name: "layout",
      //       description: "Lay out the daily briefing.",
      //       parameters: {
      //         type: "object",
      //         properties: {
      //           layout: {
      //             type: "array",
      //             items: {
      //               type: "string",
      //               enum: widgets,
      //             },
      //             description: "The ordered list of widgets to display."
      //           }
      //         }
      //       },
      //     }
      //   ],
      //   function_call: {
      //     "name": "layout",
      //   },
      // });

      // const layout = JSON.parse(layoutSuggestion.data.choices[0].message.function_call.arguments).layout;
      const layout = ["email_reply_large", "meetings"];
      console.log(layout);

      const widgetComponents = layout.map((widget) => {
        const WidgetComponent = WIDGET_MAPPINGS[widget];
        const [widgetName, size] = stripWidgetSize(widget);
        const component = (
          <Grid item xs={size * 4} key={widget} sx={{ width: '100%', height: '16rem' }}>
            <WidgetComponent data={data[widgetName]} />
          </Grid>
        );

        return component;
      });

      setComponents(widgetComponents);
    }

    prepareWidgets();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: '100vw',
          height: '100%',
          // backgroundColor: 'background.main',
        }}
      >
        <Container>
          <Grid 
            justifyContent="flex-start"
            alignItems="flex-start"
            container
            spacing={2}
          >
            {components}
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default App;
