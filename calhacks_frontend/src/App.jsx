import { useState, useEffect } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { green, purple, orange } from '@mui/material/colors';
import pullData from './util/pullData';
import { summarize, getWidgets, stripWidgetSize } from './util/summarize';
import email_reply from './components/email_reply';
import meetings from './components/meetings';
import chatbot from './components/chatbot';
import social_media from './components/social_media';
import CategorizedEmails from './components/CategorizedEmails';
import './App.css'
import { Configuration, OpenAIApi } from "openai";
import { Typography } from '@mui/material';
import logo from './assets/briefly.png';

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
console.log(OPENAI_API_KEY);

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const WIDGET_MAPPINGS = {
  email_reply,
  meetings,
  chatbot,
  social_media,
}
const DEFAULT_WIDGET = CategorizedEmails;
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
      main: '#5ebdff',
    },
    secondary: {
      main: '#5ebdff',
    },
    background: {
      main: '#1c1c1c',
    },
    mode: 'dark',
  },
});

function App() {
  const [components, setComponents] = useState([]);  // array of components
  const [extended, setExtended] = useState(false);  // whether to use normal or extended number of widgets

  useEffect(() => {
    async function prepareWidgets() {
      const data = await pullData(openai);
      const [briefingSummary, widgets] = await Promise.all([summarize(data), getWidgets(data)]);
      const layoutSuggestion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo-0613",
        messages: [
          {"role": "system", "content": "You are an assistant that designs widget layouts for a service that presents daily briefings to users based on their emails, calendar events, and more. Based on the user's data (emails, calendar events, etc.), you design a widget layout based on the most important items and things the user should know. You have access to a function to present the widgets that you call by passing the list of widgets. The order of the widgets is sorted by importance, with the most important widget first. You can also define the size of a widget; a larger widget for more important items is probably a good idea. Only include each widget type once, including variants. Do not include a widget and its large version at the same time, though not all widgets have to be included. Each widget's normal version takes up 1 space, their large versions take up 2 spaces, and their xlarge versions take up 3 spaces. The maximum number of spaces is 8, though if you use 6 or less then it will be presented in a smaller form. Try not to use too many xlarges unless it is very important, as they take up a lot of space. Also, try to leave 1 or 2 spaces for the chatbot, 2 is better, but 1 is fine."},
          {"role": "user", "content": `Here is a summary of everything I should know:\n${briefingSummary}\n\nLay out my daily briefing.`},
        ],
        functions: [
          {
            name: "layout",
            description: "Lay out the daily briefing.",
            parameters: {
              type: "object",
              properties: {
                layout: {
                  type: "array",
                  items: {
                    type: "string",
                    enum: widgets,
                  },
                  description: "The ordered list of widgets to display."
                }
              }
            },
          }
        ],
        function_call: {
          "name": "layout",
        },
      });

      const rawLayout = JSON.parse(layoutSuggestion.data.choices[0].message.function_call.arguments).layout;
      // const rawLayout = ["email_reply", "meetings"];  // mockFragment1
      // const rawLayout = ["email_reply", "meetings", "finance", "shopping", "travel"];  // mock1
      // const rawLayout = ["email_reply_large", "social_media", "AWS", "shopping"];  // mock2

      let layout = [];

      let totalSpace = 0;

      for (const widget of rawLayout) {
        if (widget.endsWith('_large')) {
          totalSpace += 2;
        } else if (widget.endsWith('_xlarge')) {
          totalSpace += 3;
        } else {
          totalSpace += 1;
        }
      }

      const curExtended = totalSpace > 5;
      setExtended(curExtended);

      console.log(rawLayout);
      let currentX = 0;
      let chatbotUsed = false;
      let widthLimit = curExtended ? 4 : 3;
      let curSpace = 0;
      for (const widget of rawLayout) {
        if (widget === 'chatbot') {
          continue;
        }

        if (widget.endsWith('_large')) {
          currentX += 2;
          curSpace += 2;
        } else if (widget.endsWith('_xlarge')) {
          currentX += 3;
          curSpace += 3;
        } else {
          currentX += 1;
          curSpace += 1;
        }

        if ((chatbotUsed && curSpace > 8) || (!chatbotUsed && curSpace > 7)) {
          if (widget.endsWith('_large')) {
            curSpace -= 2;
            currentX -= 2;
          } else if (widget.endsWith('_xlarge')) {
            curSpace -= 3;
            currentX -= 3;
          } else {
            curSpace -= 1;
            currentX -= 1;
          }

          break;
        }

        if (currentX <= widthLimit) {
          layout.push(widget);

          currentX %= widthLimit;
          continue;
        }

        if (chatbotUsed || (currentX === widthLimit + 1 && widget.endsWith('_xlarge'))) {
          let shortenedWidget = widget.replace('_large', '').replace('_xlarge', '');

          if (widget.endsWith('_xlarge') && currentX === widthLimit + 1) {
            shortenedWidget = `${shortenedWidget}_large`;
            currentX--;
            curSpace--;
          } else if (widget.endsWith('_xlarge')) {
            currentX -= 2;
            curSpace -= 2;
          } else if (widget.endsWith('_large')) {
            currentX--;
            curSpace--;
          }

          currentX %= widthLimit;
        } else {
          layout.push('chatbot');
          curSpace += 1;
          chatbotUsed = true;
          layout.push(widget);

          if (widget.endsWith('_large')) {
            currentX = 2;
          } else if (widget.endsWith('_xlarge')) {
            currentX = 3;
          } else {
            currentX = 1;
          }
        }
      }

      if (!layout.includes('chatbot') && !chatbotUsed) {
        layout.push('chatbot');
        curSpace += 1;
      }
      console.log(curSpace);

      if (curSpace < widthLimit * 2) {
        const missingSpace = widthLimit * 2 - curSpace;

        if (missingSpace === 2 && !layout[layout.length - 1].endsWith("_large") && !layout[layout.length - 1].endsWith("_xlarge")) {
          layout[layout.length - 1] = `${layout[layout.length - 1]}_xlarge`;
        } else if (missingSpace === 1 && !layout[layout.length - 1].endsWith("_xlarge")) {
          if (layout[layout.length - 1].endsWith("_large")) {
            layout[layout.length - 1] = `${layout[layout.length - 1].slice(0, -6)}_xlarge`;
          } else {
            layout[layout.length - 1] = `${layout[layout.length - 1]}_large`;
          }
        }
      }

      console.log(layout);

      const widgetComponents = layout.map((widget) => {
        let WidgetComponent = WIDGET_MAPPINGS[widget];
        const [widgetName, size] = stripWidgetSize(widget);
        if (!WidgetComponent) {
          WidgetComponent = DEFAULT_WIDGET(size, BORDER_RADIUS, ELEVATION, widgetName);
        }
        const component = (
          <Grid item xs={size * 4} key={widget} sx={{ width: '100%', height: '20rem' }}>
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
        }}
      >
        <Container
          sx={{
            width: '100%',
            height: '100%',
          }}
          maxWidth={extended ? 'xl' : 'lg'}
        >
          <Stack sx={{ paddingBottom: '2rem' }} direction="row" alignItems="center" justifyContent="center" spacing={2}>
            <Box sx={{ position: 'absolute', top: '5%', left: '2%' }}>
              <img src={logo} alt="logo" style={{ width: '6rem', height: '6rem' }} />
              <Typography variant="h3">
                Briefly
              </Typography>
            </Box>
            <Typography variant="h1">
              Good afternoon, Henry
            </Typography>
          </Stack>
          <Grid 
            justifyContent="flex-start"
            alignItems="flex-start"
            container
            spacing={2}
            columns={extended ? 16 : 12}
          >
            {components}
          </Grid>
        </Container>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          bottom: '0',
          left: '0',
          width: '100%',
          height: '100%',
          backgroundColor: 'rgb(16, 16, 32)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        className={components.length > 0 ? 'fadeOut' : ''}
      >
        <Typography variant="h3" className="fadeIn" sx={{ color: 'white' }}>
          Preparing your personalized dashboard...
        </Typography>
      </Box>
    </ThemeProvider>
  )
}

export default App;
