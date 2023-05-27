#!/bin/bash

sleep 2

until mongosh --host mongo --eval "print(\"waited for connection\")"
do
    sleep 2
done
echo "Connection finished"
echo "Creating replica set"
mongo --host mongo <<EOF
rs.initiate(
  {
    _id : 'rs0',
    members: [
      { _id : 0, host : "mongo:27017" },
    ]
  }
)
EOF

echo "replica set created"

# cleanup