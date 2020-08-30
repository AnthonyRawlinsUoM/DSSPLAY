import { Component, OnInit } from '@angular/core';


export const RESTRICTED = 3;
export const RESERVED = 2;
export const PUBLIC = 1;

@Component({
    selector: 'app-metric-chooser',
    templateUrl: './metric-chooser.component.html',
    styleUrls: ['./metric-chooser.component.css']
})
export class MetricChooserComponent implements OnInit {

    userAccessLevel = 3;

    initvals = [
        {
            label: 'Total Fire Impact',
            option: 'fire_impact',
            color: 'rgba(236, 58, 27, 0.67)',
            border: '#ec1b1b',
            class: 'crimson',
            active: false,
            icon: 'fire extinguisher',
            views: [
                {
                    label: 'Burnt Area (ha)',
                    table: ['Avg','Median','CoV','Max','Total'],
                    part: 1.5,
                    access: PUBLIC,
                    modules: ['box', 'histo'],
                    sql: `
                    SELECT
                        AVG(t.burnt_area) as AVG_BurntArea,
                        --     median(t.burnt_area) as MEDIAN_BurntArea,
                        STDDEV(t.burnt_area) / avg(t.burnt_area) as CoV,
                        MAX(t.burnt_area) as  MAX_BurntArea,
                        SUM(t.burnt_area) as TOTAL_BurntArea
                        --        ,
                        --        s.type
                    FROM
                        job
                        INNER JOIN fuel_machine_type ft
                            ON ft.fuel_machine_type_id = job.fuel_machine_kind
                        INNER JOIN jobtojobstate js
                            ON job.id=js.job_id

                        INNER JOIN jobstate j
                            ON js.job_state_id = j.id,
                        scenario s

                        INNER JOIN totalfireimpact t
                            ON s.uuid = t.uuid
                            AND s.regime = t.regime
                            AND s.replicate = t.replicate,
                         scenario_types st

                    WHERE
                        j.published = true
                        AND t.uuid = job.uuid
                        --     AND s.id = t.scenario_id
                        --     AND st.scenario_type = s.type

                        -- GROUP BY s.type

                    LIMIT 1000 OFFSET 0;
                    `
                },
                {
                    label: 'Burnt Area (ha) by Fire Season',
                    table: ['Avg','Median','CoV','Max','Total'],
                    part: 1,
                    access: PUBLIC,
                    modules: ['box', 'histo'],
                    sql: `
                    SELECT
                        AVG(t.burnt_area) as AVG_BurntArea,
                        --     median(t.burnt_area) as MEDIAN_BurntArea,
                        STDDEV(t.burnt_area) / avg(t.burnt_area) as CoV,
                        MAX(t.burnt_area) as  MAX_BurntArea,
                        SUM(t.burnt_area) as TOTAL_BurntArea,
                        -- t.burnt_area,
                        st.scenario_name
                    FROM
                        job
                        INNER JOIN fuel_machine_type ft
                            ON ft.fuel_machine_type_id = job.fuel_machine_kind
                        INNER JOIN jobtojobstate js
                            ON job.id=js.job_id

                        INNER JOIN jobstate j
                            ON js.job_state_id = j.id,
                        scenario s

                        INNER JOIN totalfireimpact t
                            ON s.uuid = t.uuid
                            AND s.regime = t.regime
                            AND s.replicate = t.replicate,
                         scenario_types st

                    WHERE
                        j.published = true
                        AND t.uuid = job.uuid
                        AND s.id = t.scenario_id
                        AND st.scenario_type = s.type

                    GROUP BY st.scenario_name

                    LIMIT 1000 OFFSET 0;
                    `
                },
                {
                    label: 'Loss',
                    table: ['Avg','Median','CoV','Max','Total'],
                    part: 2,
                    access: RESTRICTED,
                    modules: ['box', 'histo', 'cumul', 'time']
                },
                {
                    label: 'Exposure',
                    table: ['Avg','Median','CoV','Max','Total'],
                    part: 2,
                    access: RESTRICTED,
                    modules: ['box', 'histo', 'cumul', 'time']
                },
                {
                    label: 'Burnt Area (ha)',
                    table: ['Total'],
                    part: 2,
                    access: RESTRICTED,
                    modules: ['box', 'histo', 'cumul']
                },
            ]
        },
        {
            label: 'House Loss',
            option: 'house_loss',
            color: 'rgba(74, 31, 31, 0.67)',
            border: '#4A1F1F',
            class: 'copper',
            active: false,
            icon: 'home',
            views: [
                // Houses
                {
                    label: 'House Loss per year by Wildfire',
                    table: ['Avg','Median','CoV','Max','Total'],
                    part: 1,
                    access: PUBLIC,
                    modules: ['box', 'histo'],
                    sql: `
                    SELECT
                        t.people_exposed,
                        t.people_lost_harris_method,
                        st.scenario_name
                    FROM
                        job
                        INNER JOIN fuel_machine_type ft
                            ON ft.fuel_machine_type_id = job.fuel_machine_kind
                        INNER JOIN jobtojobstate js
                            ON job.id=js.job_id

                        INNER JOIN jobstate j
                            ON js.job_state_id = j.id,
                        scenario s

                        INNER JOIN peoplehouseloss t
                            ON s.uuid = t.uuid
                            AND s.regime = t.regime
                            AND s.replicate = t.replicate,
                         scenario_types st

                    WHERE
                        j.published = true
                        AND t.uuid = job.uuid
                        AND s.id = t.scenario_id
                        AND st.scenario_type = s.type

                    LIMIT 1000 OFFSET 0;
                    `
                },
                {
                    label: 'Proportion of Wildfires with House Loss per year',
                    table: ['Avg','Median','CoV','Max','Total'],
                    part: 2,
                    access: PUBLIC,
                    modules: ['box', 'histo', 'gauges']
                },
                {
                    label: 'House Loss per year by Wildfire',
                    table: ['Total'],
                    part: 3,
                    access: RESTRICTED,
                    modules: ['box', 'histo', 'replicates', 'cumul', 'uncertainty']
                },

            ]
        },
        {
            label: 'Life Loss',
            option: 'life_loss',
            color: 'rgba(168, 95, 41, 0.67)',
            border: '#A85F29',
            class: 'goldcrayola',
            active: false,
            icon: 'user',
            views: [
                // People
                {
                    label: 'Total Life Loss per year by Wildfire',
                    table: ['Avg','Median','CoV','Max','Total'],
                    part: 1,
                    access: PUBLIC,
                    modules: ['box', 'histo']
                },
                {
                    label: 'Proportion of Wildfires with Life Loss per year',
                    table: ['Avg','Median','CoV','Max','Total'],
                    part: 2,
                    access: PUBLIC,
                    modules: ['box', 'histo']
                },
                {
                    label: 'Total Life Loss per year by Wildfire',
                    table: ['Avg','Median','CoV','Max','Total'],
                    part: 3,
                    access: RESTRICTED,
                    modules: ['box', 'histo', 'replicates', 'cumul', 'uncertainty']
                },
            ]
        },
        {
            label: 'Biodiversity',
            option: 'bio_diversity',
            color: 'rgba(73, 96, 9, 0.67)',
            border: '#496009',
            class: 'amazon',
            active: false,
            icon: 'leaf',
            views: [
                {
                    label: 'Fire Area per year by Wildfire',
                    table: ['Avg','Median','CoV','Max','Total'],
                    part: 1,
                    access: PUBLIC,
                    modules: ['box', 'histo']
                },
                {
                    label: 'Proportion of Wildfires with Habitat Loss per year',
                    table: ['Avg','Median','CoV','Max','Total'],
                    part: 2,
                    access: PUBLIC,
                    modules: ['box', 'histo']
                },
                {
                    label: 'Total Habitat Loss per year by Wildfire',
                    table: ['Avg','Median','CoV','Max','Total'],
                    part: 2,
                    access: RESTRICTED,
                    modules: ['line', 'replicates', 'cumul']
                },
            ]
        },
        {
            label: 'BiodiversityTFI',
            option: 'bio_diversity_tfi',
            color: 'rgba(23, 96, 9, 0.67)',
            border: '#236009',
            class: 'maxgreen',
            active: false,
            icon: 'leaf',
            views: [
                {
                    label: 'Fire Area per year by EFG and Wildfire',
                    table: ['Avg','Median','CoV','Max','Total'],
                    part: 1,
                    access: PUBLIC,
                    modules: ['box', 'histo']
                },
                {
                    label: 'Proportion of Wildfires with Habitat Loss by EFG per year',
                    table: ['Avg','Median','CoV','Max','Total'],
                    part: 1.5,
                    access: PUBLIC,
                    modules: ['box', 'histo']
                },
                {
                    label: 'Habitat Loss per year by EFG and Wildfire by subset of Replicates',
                    table: ['Avg','Median','CoV','Max','Total'],
                    part: 2,
                    access: RESTRICTED,
                    modules: ['line', 'replicates', 'cumul', 'uncertainty']
                },
            ]
        },
        {
            label: 'Viewshed',
            option: 'viewshed',
            color: 'rgba(11, 135, 162, 0.67)',
            border: '#0B87A2',
            class: 'tealblue',
            active: false,
            icon: 'image outline',
            views: []
        },
        {
            label: 'Carbon',
            option: 'carbon',
            color: 'rgba(0,0,0, 0.68)',
            border: '#000000',
            class: 'richblackfogra',
            active: false,
            icon: 'circle',
            views: [
                {
                    label: 'Carbon Released per year by Fire Season',
                    table: ['Avg','Median','CoV','Max','Total'],
                    part: 1,
                    access: PUBLIC,
                    modules: ['box', 'histo']
                },

                {
                    label: 'Carbon Released per year',
                    table: ['Avg','Median','CoV','Max','Total'],
                    part: 1.5,
                    access: PUBLIC,
                    modules: ['box', 'histo']
                },
                {
                    label: 'Carbon Released per year by subset of Replicates',
                    table: ['Max'],
                    part: 2,
                    access: RESTRICTED,
                    modules: ['line', 'uncertainty']
                },
            ]
        },
        {
            label: 'Debris Flow',
            option: 'debris_flow',
            color: 'rgba(39, 56, 89, 0.67)',
            border: '#273859',
            class: 'midnight',
            active: false,
            icon: 'tint',
            views: []
        },
        {
            label: 'Water Yield',
            option: 'water_yield',
            color: 'rgba(13, 88, 158, 0.67)',
            border: '#0D589E',
            class: 'bdazzledblue',
            active: false,
            icon: 'bath',
            views: []
        },
        {
            label: 'RUSLE',
            option: 'rusle',
            color: 'rgba(83, 87, 23, 0.67)',
            border: '#535717',
            class: 'ferngreen',
            active: false,
            icon: 'question circle',
            views: []
        },
        {
            label: 'Mean Erosion Rate',
            option: 'mean_erosion_rate',
            color: 'rgba(61, 38, 51, 0.68)',
            border: '#3D2633',
            class: 'darkliverhorses',
            active: false,
            icon: 'circle outline',
            views: []
        },
        {
            label: 'Infrastructure',
            option: 'infrastructure',
            color: 'rgba(18, 107, 56, 0.66)',
            border: '#126B38',
            class: 'midnighteagle',
            active: false,
            icon: 'industry',
            views: []
        },
        {
            label: 'GMA',
            option: 'gma',
            color: 'rgba(30, 38, 222, 0.67)',
            border: '#1E26DE',
            class: 'starcommandblue',
            active: false,
            icon: 'dot circle',
            views: []
        }
    ];

    constructor() { }

    ngOnInit() {
    }

}
