import 'package:flutter/material.dart';

import 'news.dart';
import 'statistics.dart';

void main() => runApp(MainApp());

class MainApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'CoronaStats',
      home: Home(),
      theme: ThemeData(primaryColor: Colors.red[400]),
    );
  }
}

class Home extends StatefulWidget {
  @override
  _HomeState createState() => _HomeState();
}

class _HomeState extends State<Home> {
  Widget body = Statistics();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('CoronaStats'),
      ),
      drawer: Drawer(
        child: ListView(
          padding: EdgeInsets.zero,
          children: <Widget>[
            DrawerHeader(
              child: Text(
                'CoronaStats',
                style: TextStyle(color: Colors.white70),
              ),
              decoration: BoxDecoration(
                image: DecorationImage(
                  image: AssetImage('assets/images/statistics_dashboard.jpg'),
                  fit: BoxFit.cover,
                ),
              ),
            ),
            ListTile(
              title: Text('Statistics'),
              onTap: () {
                setState(() {
                  body = Statistics();
                });
                Navigator.pop(context);
              },
              trailing: Icon(Icons.arrow_right),
            ),
            ListTile(
              title: Text('News'),
              onTap: () {
                setState(() {
                  body = News();
                });
                Navigator.pop(context);
              },
              trailing: Icon(Icons.arrow_right),
            ),
          ],
        ),
      ),
      body: body,
    );
  }
}
