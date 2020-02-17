/// The main file which Flutter runs
/// Github: https://github.com/raphtlw/CoronaStats

import 'package:flutter/material.dart';

import 'news.dart';
import 'statistics.dart';

void main() => runApp(CoronaStats());

class CoronaStats extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'CoronaStats',
      home: Home(),
      theme: ThemeData(primaryColor: Colors.orange[200]),
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
              child: Text('CoronaStats'),
              decoration: BoxDecoration(color: Colors.orange[200]),
            ),
            ListTile(
              title: Text('Statistics'),
              onTap: () {
                setState(() {
                  body = Statistics();
                });
                Navigator.pop(context);
              },
            ),
            ListTile(
              title: Text('News'),
              onTap: () {
                setState(() {
                  body = News();
                });
                Navigator.pop(context);
              },
            ),
          ],
        ),
      ),
      body: body,
    );
  }
}
