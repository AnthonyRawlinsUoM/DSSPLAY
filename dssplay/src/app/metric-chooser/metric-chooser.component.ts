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
            label: 'Fire Impact',
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
                    modules: ['box', 'histo', 'gauges'],
                    summarysql:`
                    SELECT
                        DISTINCT(s.id),
                        avg(t.burnt_area) as _avg,
                        median(CAST(t.burnt_area AS numeric)) as _median,
                        MIN(t.burnt_area) as _min,
                        STDDEV(t.burnt_area) / avg(t.burnt_area) as _cov,
                        MAX(t.burnt_area) as  _max,
                        SUM(t.burnt_area) as _total

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
                    -- AND ft.fuel_machine_type_name = 'invexp'

                    GROUP BY s.id

                    --  LIMIT 50 OFFSET 0

                    ;`
                    ,
                    rawdatasql: `
                    SELECT
                        s.id,
                        AVG(t.burnt_area) as avg
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

                    -- AND ft.fuel_machine_type_name = 'invexp'

                    GROUP BY s.type, s.id
                    ORDER BY s.id

                    --  LIMIT 50 OFFSET 0
                    ;
                    `
                },
                {
                    label: 'Burnt Area (ha) by Fire Season',
                    table: ['Avg','Median','CoV','Max','Total'],
                    part: 1,
                    access: PUBLIC,
                    modules: ['box', 'histo', 'gauges'],
                    summarysql: `
                    SELECT
                        avg(t.burnt_area) as _avg,
                        median(CAST(t.burnt_area AS numeric)) as _median,
                        MIN(t.burnt_area) as _min,
                        STDDEV(t.burnt_area) / avg(t.burnt_area) as _cov,
                        MAX(t.burnt_area) as  _max,
                        SUM(t.burnt_area) as _total,
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
                    -- AND ft.fuel_machine_type_name = 'invexp'

                    GROUP BY s.id, st.scenario_name
                    ORDER BY s.id;
                    `,
                    rawdatasql: `
                    SELECT
                        s.id,
                        AVG(t.burnt_area) as avg,
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
                    -- AND ft.fuel_machine_type_name = 'invexp'

                    GROUP BY s.id, st.scenario_name
                    ORDER BY s.id;

                    `
                },
                {
                    label: 'Loss',
                    table: ['Avg','Median','CoV','Max','Total'],
                    part: 2,
                    access: RESTRICTED,
                    modules: ['box', 'histo', 'cumul', 'time', 'gauges'],
                    summarysql: ``,
                    rawdatasql: ``
                },
                {
                    label: 'Exposure',
                    table: ['Avg','Median','CoV','Max','Total'],
                    part: 2,
                    access: RESTRICTED,
                    modules: ['box', 'histo', 'cumul', 'time', 'gauges'],
                    summarysql: ``,
                    rawdatasql: ``
                },
                {
                    label: 'Burnt Area (ha)',
                    table: ['Total'],
                    part: 2,
                    access: RESTRICTED,
                    modules: ['box', 'histo', 'cumul', 'gauges'],
                    summarysql: ``,
                    rawdatasql: ``
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
                    table: ['Avg','Median','Deviation','Max','Total'],
                    part: 1,
                    access: PUBLIC,
                    modules: ['box', 'histo', 'gauges'],
                    rawdatasql: `
                    SELECT
                        s.id,
                        AVG(t.houses_lost) as avg
                    FROM
                        job
                        INNER JOIN fuel_machine_type ft
                            ON ft.fuel_machine_type_id = job.fuel_machine_kind
                        INNER JOIN jobtojobstate js
                            ON job.id=js.job_id

                        INNER JOIN jobstate j
                            ON js.job_state_id = j.id,
                        scenario s

                        INNER JOIN peoplehouselossperfire t
                            ON s.uuid = t.uuid
                            AND s.regime = t.regime
                            AND s.replicate = t.replicate,
                         scenario_types st

                    WHERE
                        j.published = true
                        AND t.uuid = job.uuid
                        AND s.id = t.scenario_id
                        AND st.scenario_type = s.type
                        AND s.type = 1
                    --  AND ft.fuel_machine_type_name = 'invexp'

                    GROUP BY s.id
                    ORDER BY s.id
                    --  LIMIT 50 OFFSET 0
                        ;

                    `,
                    summarysql: `
                    SELECT
                        s.id,
                        avg(t.houses_lost) as _avg,
                        median(CAST(t.houses_lost AS numeric)) as _median,
                        MIN(t.houses_lost) as _min,
                        STDDEV(t.houses_lost) as _stddev,
                        MAX(t.houses_lost) as  _max,
                        SUM(t.houses_lost) as _total
                    FROM
                        job
                        INNER JOIN fuel_machine_type ft
                            ON ft.fuel_machine_type_id = job.fuel_machine_kind
                        INNER JOIN jobtojobstate js
                            ON job.id=js.job_id

                        INNER JOIN jobstate j
                            ON js.job_state_id = j.id,
                        scenario s

                        INNER JOIN peoplehouselossperfire t
                            ON s.uuid = t.uuid
                            AND s.regime = t.regime
                            AND s.replicate = t.replicate,
                         scenario_types st

                    WHERE
                        j.published = true
                        AND t.uuid = job.uuid
                        AND s.id = t.scenario_id
                        AND st.scenario_type = s.type
                        AND s.type = 1
                    --  AND ft.fuel_machine_type_name = 'invexp'


                    GROUP BY s.id
                    ORDER BY s.id

                    --  LIMIT 50 OFFSET 0
                    ;
                    `
                },
                {
                    label: 'Proportion of Wildfires with House Loss per year',
                    table: ['Avg','Median','CoV','Max','Total'],
                    part: 2,
                    access: PUBLIC,
                    modules: ['box', 'histo', 'gauges'],
                    summarysql: `
                    SELECT
                        s.id,
                        avg(t.houses_lost) as _avg,
                        median(CAST(t.houses_lost AS numeric)) as _median,
                        MIN(t.houses_lost) as _min,
                        STDDEV(t.houses_lost) / avg(t.houses_lost) as _cov,
                        MAX(t.houses_lost) as  _max,
                        SUM(t.houses_lost) as _total
                    FROM
                        job
                        INNER JOIN fuel_machine_type ft
                            ON ft.fuel_machine_type_id = job.fuel_machine_kind
                        INNER JOIN jobtojobstate js
                            ON job.id=js.job_id
                        INNER JOIN jobstate j
                            ON js.job_state_id = j.id,

                        scenario s
                        INNER JOIN peoplehouselossperfire t
                            ON s.uuid = t.uuid
                            AND s.regime = t.regime
                            AND s.replicate = t.replicate,

                        scenario_types st

                    WHERE
                        j.published = true
                        AND t.uuid = job.uuid
                        AND st.scenario_type = 1 -- WILDFIRE
                    -- AND ft.fuel_machine_type_name = 'invexp'

                    GROUP BY s.id
                    ORDER BY s.id

                    --  LIMIT 50 OFFSET 0
                    ;
                    `,
                    rawdatasql: `
                    SELECT
                        s.id,
                        AVG(t.houses_lost),

                    FROM
                        job
                        INNER JOIN fuel_machine_type ft
                            ON ft.fuel_machine_type_id = job.fuel_machine_kind
                        INNER JOIN jobtojobstate js
                            ON job.id=js.job_id

                        INNER JOIN jobstate j
                            ON js.job_state_id = j.id,
                        scenario s

                        INNER JOIN peoplehouselossperfire t
                            ON s.uuid = t.uuid
                            AND s.regime = t.regime
                            AND s.replicate = t.replicate,
                         scenario_types st

                    WHERE
                        j.published = true
                        AND t.uuid = job.uuid
                        AND s.id = t.scenario_id
                        AND st.scenario_type = s.type
                    -- AND ft.fuel_machine_type_name = 'invexp'

                    GROUP BY s.id
                    ORDER BY s.id
                    --  LIMIT 50 OFFSET 0
                        ;
                `
                },
                {
                    label: 'House Loss per year by Wildfire',
                    table: ['Total'],
                    part: 3,
                    access: RESTRICTED,
                    modules: ['box', 'histo', 'replicates', 'cumul', 'uncertainty', 'gauges'],
                    summarysql: `
                    SELECT
                        s.id,
                        avg(t.houses_lost) as _avg,
                        median(CAST(t.houses_lost AS numeric)) as _median,
                        MIN(t.houses_lost) as _min,
                        STDDEV(t.houses_lost) AS _stddev
                        MAX(t.houses_lost) as  _max,
                        SUM(t.houses_lost) as _total
                    FROM
                        job
                        INNER JOIN fuel_machine_type ft
                            ON ft.fuel_machine_type_id = job.fuel_machine_kind
                        INNER JOIN jobtojobstate js
                            ON job.id=js.job_id

                        INNER JOIN jobstate j
                            ON js.job_state_id = j.id,
                        scenario s

                        INNER JOIN peoplehouselossperfire t
                            ON s.uuid = t.uuid
                            AND s.regime = t.regime
                            AND s.replicate = t.replicate,
                         scenario_types st

                    WHERE
                        j.published = true
                        AND t.uuid = job.uuid
                        AND s.id = t.scenario_id
                        AND st.scenario_type = s.type
                        AND s.type = 1
                    --  AND ft.fuel_machine_type_name = 'invexp'

                    GROUP BY s.id
                    ORDER BY s.id
                    -- GROUP BY st.scenario_name, t.replicate, t.regime

                    --  LIMIT 50 OFFSET 0
                    ;
                    `,
                    rawdatasql: `
                    SELECT
                        AVG(t.houses_lost),
                        s.id
                    FROM
                        job
                        INNER JOIN fuel_machine_type ft
                            ON ft.fuel_machine_type_id = job.fuel_machine_kind
                        INNER JOIN jobtojobstate js
                            ON job.id=js.job_id

                        INNER JOIN jobstate j
                            ON js.job_state_id = j.id,
                        scenario s

                        INNER JOIN peoplehouselossperfire t
                            ON s.uuid = t.uuid
                            AND s.regime = t.regime
                            AND s.replicate = t.replicate,
                         scenario_types st

                    WHERE
                        j.published = true
                        AND t.uuid = job.uuid
                        AND s.id = t.scenario_id
                        AND st.scenario_type = s.type
                        AND s.type = 1
                    --  AND ft.fuel_machine_type_name = 'invexp'

                    GROUP BY s.id
                    ORDER BY s.id
                    --  LIMIT 50 OFFSET 0
                        ;
                        `
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
                    table: ['Avg','Median','Deviation','Max','Total'],
                    part: 1,
                    access: PUBLIC,
                    modules: ['box', 'histo', 'gauges'],
                    summarysql:`
                    SELECT
                        s.id,
                        avg(t.people_lost_harris_method) as _avg,
                        median(CAST(t.people_lost_harris_method AS numeric)) as _median,
                        MIN(t.people_lost_harris_method) as _min,
                        STDDEV(t.people_lost_harris_method) as _stddev,
                        MAX(t.people_lost_harris_method) as  _max,
                        SUM(t.people_lost_harris_method) as _total
                    FROM
                        job
                        INNER JOIN fuel_machine_type ft
                            ON ft.fuel_machine_type_id = job.fuel_machine_kind
                        INNER JOIN jobtojobstate js
                            ON job.id=js.job_id
                        INNER JOIN jobstate j
                            ON js.job_state_id = j.id,

                        scenario s
                        INNER JOIN peoplehouselossperfire t
                            ON s.uuid = t.uuid
                            AND s.regime = t.regime
                            AND s.replicate = t.replicate,

                        scenario_types st

                    WHERE
                        j.published = true
                        AND t.uuid = job.uuid
                        AND st.scenario_type = 1 -- WILDFIRE
                    -- AND ft.fuel_machine_type_name = 'invexp'

                    GROUP BY s.id
                    ORDER BY s.id
                    --  LIMIT 50 OFFSET 0
                    ;
                    `,
                    rawdatasql: `

                    SELECT
                        s.id,
                        AVG(t.people_lost_harris_method) as avg
                    FROM
                        job
                        INNER JOIN fuel_machine_type ft
                            ON ft.fuel_machine_type_id = job.fuel_machine_kind
                        INNER JOIN jobtojobstate js
                            ON job.id=js.job_id
                        INNER JOIN jobstate j
                            ON js.job_state_id = j.id,

                        scenario s
                        INNER JOIN peoplehouselossperfire t
                            ON s.uuid = t.uuid
                            AND s.regime = t.regime
                            AND s.replicate = t.replicate,

                        scenario_types st

                    WHERE
                        j.published = true
                        AND t.uuid = job.uuid
                        AND st.scenario_type = 1 -- WILDFIRE
                    -- AND ft.fuel_machine_type_name = 'invexp'

                    GROUP BY s.id
                    ORDER BY s.id
                    --  LIMIT 50 OFFSET 0
                    ;
                    `
                },
                {
                    label: 'Proportion of Wildfires with Life Loss per year',
                    table: ['Avg','Median','CoV','Max','Total'],
                    part: 2,
                    access: PUBLIC,
                    modules: ['box', 'histo', 'gauges'],
                    summarysql: ``,
                    rawdatasql: ``
                },
                {
                    label: 'Total Life Loss per year by Wildfire',
                    table: ['Avg','Median','CoV','Max','Total'],
                    part: 3,
                    access: RESTRICTED,
                    modules: ['box', 'histo', 'replicates', 'cumul', 'uncertainty', 'gauges'],
                    summarysql: ``,
                    rawdatasql: ``
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
                    modules: ['box', 'histo', 'gauges'],
                    summarysql: ``,
                    rawdatasql: ``
                },
                {
                    label: 'Proportion of Wildfires with Habitat Loss per year',
                    table: ['Avg','Median','Deviation','Min','Max','Total'],
                    part: 2,
                    access: PUBLIC,
                    modules: ['box','histo', 'gauges'],
                    summarysql: `
                    SELECT
                        DISTINCT all_fires.id as scenario,
                        AVG(CAST((fires_with_habitat_loss.total / all_fires.total) AS REAL)) AS _avg,
                        median(CAST(CAST((fires_with_habitat_loss.total / all_fires.total) AS REAL) AS numeric)) AS _median,
                        MAX(CAST((fires_with_habitat_loss.total / all_fires.total) AS REAL)) AS _max,
                        MIN(CAST((fires_with_habitat_loss.total / all_fires.total) AS REAL)) AS _min,
                        STDDEV(CAST((fires_with_habitat_loss.total / all_fires.total) AS REAL)) AS _stddev,
                        SUM(CAST((fires_with_habitat_loss.total / all_fires.total) AS REAL)) AS _total

                    FROM (
                        SELECT
                            COUNT(b.fire_id) as total,
                            s.id
                        FROM
                             job
                        INNER JOIN fuel_machine_type ft
                          ON ft.fuel_machine_type_id = job.fuel_machine_kind
                        INNER JOIN jobtojobstate js
                          ON job.id = js.job_id

                        INNER JOIN jobstate j
                          ON js.job_state_id = j.id,
                            scenario s

                        INNER JOIN totalfireimpact t
                          ON s.uuid = t.uuid
                              AND s.regime = t.regime
                              AND s.replicate = t.replicate
                        INNER JOIN biodiversity b
                          ON s.id = b.scenario_id
                              AND t.fire_id = b.fire_id,

                            scenario_types st

                        WHERE j.published = true
                            AND t.uuid = job.uuid
                            AND s.id = t.scenario_id
                            AND st.scenario_type = s.type
                            AND s.type = 1
                            AND ft.fuel_machine_type_name = 'invexp'
                            AND ((b.num_ldb_possum_cells_burnt
                                + b.num_nature_print_cells_burnt
                                + b.num_wet_forest_veg_cells_burnt
                                + b.num_greater_glider_0_33_cells_burnt
                                + b.num_greater_glider_0_75_cells_burnt) > 0)
                        GROUP BY s.id, st.scenario_name, t.replicate, t.regime
                        ) AS fires_with_habitat_loss,

                    (SELECT
                        COUNT(b.fire_id) as total,
                        st.scenario_name,
                        t.replicate,
                        t.regime,
                        s.id
                    FROM
                         job
                    INNER JOIN fuel_machine_type ft
                      ON ft.fuel_machine_type_id = job.fuel_machine_kind
                    INNER JOIN jobtojobstate js
                      ON job.id = js.job_id

                    INNER JOIN jobstate j
                      ON js.job_state_id = j.id,
                        scenario s

                    INNER JOIN totalfireimpact t
                      ON s.uuid = t.uuid
                          AND s.regime = t.regime
                          AND s.replicate = t.replicate
                    INNER JOIN biodiversity b
                      ON s.id = b.scenario_id
                          AND t.fire_id = b.fire_id,

                        scenario_types st

                    WHERE j.published = true
                        AND t.uuid = job.uuid
                        AND s.id = t.scenario_id
                        AND st.scenario_type = s.type
                        AND s.type = 1
                        AND ft.fuel_machine_type_name = 'invexp'
                    GROUP BY s.id, st.scenario_name, t.replicate, t.regime
                        ) all_fires
                    GROUP BY all_fires.id
                    ORDER  BY all_fires.id

                    --  LIMIT 50 OFFSET 0;
                    `,
                    rawdatasql: `
                    SELECT
                        all_fires.id as scenario,
                        (CAST((fires_with_habitat_loss.total / all_fires.total) AS REAL)) AS _avg,
                        (CAST(CAST((fires_with_habitat_loss.total / all_fires.total) AS REAL) AS numeric)) AS _median,
                        (CAST((fires_with_habitat_loss.total / all_fires.total) AS REAL)) AS _max,
                        (CAST((fires_with_habitat_loss.total / all_fires.total) AS REAL)) AS _min,
                        (CAST((fires_with_habitat_loss.total / all_fires.total) AS REAL)) AS _stddev,
                        (CAST((fires_with_habitat_loss.total / all_fires.total) AS REAL)) AS _total

                    FROM (
                        SELECT
                            COUNT(b.fire_id) as total,
                            s.id
                        FROM
                             job
                        INNER JOIN fuel_machine_type ft
                          ON ft.fuel_machine_type_id = job.fuel_machine_kind
                        INNER JOIN jobtojobstate js
                          ON job.id = js.job_id

                        INNER JOIN jobstate j
                          ON js.job_state_id = j.id,
                            scenario s

                        INNER JOIN totalfireimpact t
                          ON s.uuid = t.uuid
                              AND s.regime = t.regime
                              AND s.replicate = t.replicate
                        INNER JOIN biodiversity b
                          ON s.id = b.scenario_id
                              AND t.fire_id = b.fire_id,

                            scenario_types st

                        WHERE j.published = true
                            AND t.uuid = job.uuid
                            AND s.id = t.scenario_id
                            AND st.scenario_type = s.type
                            AND s.type = 1
                            AND ft.fuel_machine_type_name = 'invexp'
                            AND ((b.num_ldb_possum_cells_burnt
                                + b.num_nature_print_cells_burnt
                                + b.num_wet_forest_veg_cells_burnt
                                + b.num_greater_glider_0_33_cells_burnt
                                + b.num_greater_glider_0_75_cells_burnt) > 0)
                        GROUP BY s.id, st.scenario_name, t.replicate, t.regime
                        ) AS fires_with_habitat_loss,

                    (SELECT
                        COUNT(b.fire_id) as total,
                        st.scenario_name,
                        t.replicate,
                        t.regime,
                        s.id
                    FROM
                         job
                    INNER JOIN fuel_machine_type ft
                      ON ft.fuel_machine_type_id = job.fuel_machine_kind
                    INNER JOIN jobtojobstate js
                      ON job.id = js.job_id

                    INNER JOIN jobstate j
                      ON js.job_state_id = j.id,
                        scenario s

                    INNER JOIN totalfireimpact t
                      ON s.uuid = t.uuid
                          AND s.regime = t.regime
                          AND s.replicate = t.replicate
                    INNER JOIN biodiversity b
                      ON s.id = b.scenario_id
                          AND t.fire_id = b.fire_id,

                        scenario_types st

                    WHERE j.published = true
                        AND t.uuid = job.uuid
                        AND s.id = t.scenario_id
                        AND st.scenario_type = s.type
                        AND s.type = 1
                        AND ft.fuel_machine_type_name = 'invexp'
                    GROUP BY s.id, st.scenario_name, t.replicate, t.regime
                        ) all_fires
                    -- GROUP BY all_fires.id
                    ORDER  BY all_fires.id

                    --  LIMIT 50 OFFSET 0;
                 `
                },
                {
                    label: 'Total Habitat Loss per year by Wildfire',
                    table: ['Avg','Median','CoV','Max','Total'],
                    part: 2,
                    access: RESTRICTED,
                    modules: ['line', 'replicates', 'cumul', 'gauges'],
                    summarysql: ``,
                    rawdatasql: ``
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
                    modules: ['box', 'histo', 'gauges'],
                    summarysql: ``,
                    rawdatasql: ``
                },
                {
                    label: 'Proportion of Wildfires with Habitat Loss by EFG per year',
                    table: ['Avg','Median','CoV','Max','Total'],
                    part: 1.5,
                    access: PUBLIC,
                    modules: ['box', 'histo', 'gauges'],
                    summarysql: ``,
                    rawdatasql: ``
                },
                {
                    label: 'Habitat Loss per year by EFG and Wildfire by subset of Replicates',
                    table: ['Avg','Median','CoV','Max','Total'],
                    part: 2,
                    access: RESTRICTED,
                    modules: ['line', 'replicates', 'cumul', 'uncertainty', 'gauges'],
                    summarysql: ``,
                    rawdatasql: ``
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
            color: 'rgba(255,255,255, 0.68)',
            border: '#FFFFFF',
            class: 'white',
            active: false,
            icon: 'circle',
            views: [
                {
                    label: 'Carbon Released per year by Fire Season',
                    table: ['Avg','Median','CoV','Max','Total'],
                    part: 1,
                    access: PUBLIC,
                    modules: ['box', 'histo', 'gauges'],
                    summarysql: ``,
                    rawdatasql: ``
                },

                {
                    label: 'Carbon Released per year',
                    table: ['Avg','Median','CoV','Max','Total'],
                    part: 1.5,
                    access: PUBLIC,
                    modules: ['box', 'histo', 'gauges'],
                    summarysql: ``,
                    rawdatasql: ``
                },
                {
                    label: 'Carbon Released per year by subset of Replicates',
                    table: ['Max'],
                    part: 2,
                    access: RESTRICTED,
                    modules: ['line', 'uncertainty', 'gauges'],
                    summarysql: ``,
                    rawdatasql: ``
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
