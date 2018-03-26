// widget configuration
const config = {
  grid: {
    name: 'grid',
    show: {
      footer: true,
      toolbar: true
    },
    columns: [
      { field: 'personid', caption: 'ID', size: '50px', sortable: true, searchable: 'int', resizable: true },
      { field: 'fname', caption: 'First Name', size: '140px', sortable: true, searchable: 'text', resizable: true },
      { field: 'lname', caption: 'Last Name', size: '140px', sortable: true, searchable: 'text', resizable: true },
      { field: 'email', caption: 'Email', size: '100%', resizable: true, sortable: true },
      { field: 'snumber', caption: 'Number', size: '120px', resizable: true, sortable: true, render: 'money' },
      { field: 'sdate', caption: 'Date', size: '120px', resizable: true, sortable: true, render: 'date' }
    ]
  }
};

Array.prototype.groupBy = function(prop) {
  return this.reduce((tree, el) => {
    const record = tree.find(item => item[prop] === el[prop]);
    if (record) {
      record.w2ui.children.push(el);
    } else {
      tree.push(Object.assign({w2ui:{children: [el]}}, el));
    }
    return tree
  }, [])
};

// initialization
$().w2grid(config.grid);

// generate data
const fname = ['Vitali', 'Katsia', 'John', 'Peter', 'Sue', 'Olivia', 'Thomas', 'Sergei', 'Snehal', 'Avinash', 'Divia'];
const lname = ['Peterson', 'Rene', 'Johnson', 'Cuban', 'Twist', 'Sidorov', 'Vasiliev', 'Yadav', 'Vaishnav'];
const plainData = [];
for (let i = 0; i < 25000; i++) {
  plainData.push({
    recid : i+1,
    personid: i+1,
    fname: fname[Math.floor(Math.random() * fname.length)],
    lname: lname[Math.floor(Math.random() * lname.length)],
    email: 'vm@gmail.com', manager: '--',
    snumber: Math.floor(Math.random() * 8000),
    sdate: (new Date(Math.floor(Math.random() * 20000) * 100000000)).getTime()
  });
}

// add 25k records
w2ui.grid.records = [...plainData];
w2ui.grid.refresh();
$('#main').w2render('grid');

w2ui.grid.on('columnClick', e => {
  if (e.field === 'fname' || e.field === 'lname') {
    w2ui.grid.records = [...plainData];
    w2ui.grid.records = [...w2ui.grid.records.groupBy(e.field)];
    w2ui.grid.refresh();
  } else {
    w2ui.grid.records = [...plainData];
  }
});

w2ui.grid.on('reload', () => {
  w2ui.grid.stateReset();
  w2ui.grid.records = [...plainData]
});