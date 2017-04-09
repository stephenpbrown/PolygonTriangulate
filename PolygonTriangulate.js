// Steve Brown
// CS442
// Programming Assignment #1
// Due 9/12/16

process.stdin.setEncoding('utf8');

var inputChunks = [];

process.stdin.on('data', function(chunk) {
	inputChunks.push(chunk);
});

process.stdin.on('end', function() {
	var inputJSON = inputChunks.join();
	var verts = JSON.parse(inputJSON);
	var poly = new Polygon(verts);
	triangles = poly.triangulate();
	var result = {"verts" : verts, "triangles" : triangles};
	process.stdout.write(JSON.stringify(result, null, 4) + '\n');
});

function Polygon(verts)
{
	// Polygon prototype function triangulate returns the triangles strip
	Polygon.prototype.triangulate = function triangulate() 
	{
		var N = verts.length;
		
		if(N < 3) // If triangle is less than 3, return empty array
			return [];
		
		// Compute area of polygon A
		var A = 0;
		for(i = 0; i < N; i++)
		{
			A += verts[i].x*verts[(i+1)%N].y - verts[(i+1)%N].x*verts[i].y;
		}
		A = A*0.5;
		//console.log(A); // DEBUG
		// Build index array
		var I = [];
		for(i = 0; i < N; i++)
		{
			I[i] = i;
		}
		
		var T = []; // Initially empty array for the triangle indices
		
		while(I.length > 3)
		{
			// console.log(I); // DEBUG
			N = I.length; // N to modulo with
			
			var a = 0.0; // Area of biggest ear
			var n = 0; // index of biggest ear
			
			for(i = 0; i < I.length; i++)
			{
				// Find triangle of triangle
				var triangle = [
					{x: verts[I[(i-1+N)%N]].x, y: verts[I[(i-1+N)%N]].y},
					{x: verts[I[i]].x, y: verts[I[i]].y},
					{x: verts[I[(i+1)%N]].x, y: verts[I[(i+1)%N]].y}
				];
				//process.stdout.write(JSON.stringify(triangle, null, 4) + '\n'); // DEBUG

				// Compute area of triangle Ai
				var Ai = 0;
				for(k = 0; k < 3; k++)
				{
					Ai += triangle[k].x*triangle[(k+1)%3].y - triangle[(k+1)%3].x*triangle[k].y;
				}
				Ai = 0.5*Ai;
				//console.log(Ai); // DEBUG
				if(Math.abs(Ai) > a && Ai*A > 0)
				{
					var ear = true;
					
					// Check each point P in the triangle
					for(j = 0; j < I.length; j++)
					{
						if(ear == true && j != (i-1+N)%N && j != i && j != (i+1)%N)
						{
							// Point P is the point to check against the triangle 
							var P = [{x: verts[I[j]].x, y: verts[I[j]].y}];
							ear = !(DeterminePInTriangle(triangle, P));
							
						}
					}
					if(ear)
					{
						n = i;
						a = Math.abs(Ai);
					}
				}
			}
			// Add indices to T
			T.push(I[(n-1+N)%N], I[n], I[(n+1)%N]);

			//console.log("Remove " + n + " from I"); DEBUG
			
			// Remove indices from I
			I.splice(n,1);
		}
		// Add last remaining indices to T
		T.push(I[0], I[1], I[2]);

		return T;
	}
}

// Function for determining if P lies inside the triangle
function DeterminePInTriangle(triangle, P)
{
	var d = 0;
	var first = true;

	for(b = 0; b < 3; b++)
	{
		// Cross product
		var u = [{x: (triangle[(b+1)%3].x - triangle[b].x), y: (triangle[(b+1)%3].y - triangle[b].y)}];
		var w = [{x: P[0].x - triangle[b].x, y: P[0].y - triangle[b].y}];
		
		// DEBUG
		// console.log("u");
		// console.log(u);
		// console.log("w");
		// console.log(w);
		
		// Determine if P is in the triangle based off the sign for z
		var z = u[0].x*w[0].y - u[0].y*w[0].x;
		// console.log(z); // DEBUG
		if(z != 0)
		{
			if(first)
			{
				d = z;
				first = false;
			}
			else if(z*d < 0)
			{
				return false;
			}
		}
	}
	return true;
}















